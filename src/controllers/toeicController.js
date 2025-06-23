const path = require('path');
const ToeicResult = require('../models/ToeicResult');
const ToeicQuestion = require('../models/ToeicQuestion');
const ToeicTest = require('../models/ToeicTest');

console.log('ToeicController loaded');

// Hàm render trang làm bài thi TOEIC
exports.renderTest = async (req, res) => {
  try {
    const testId = req.query.testId;
    const selectedParts = req.query.selectedParts;
    const duration = req.query.duration;

    let allowedParts;
    let partNumber;
    let secondsRemaining;

    if (selectedParts) {
      // CHẾ ĐỘ LUYỆN TẬP
      allowedParts = Array.isArray(selectedParts) ? selectedParts.map(p => parseInt(p)) : [parseInt(selectedParts)];
      partNumber = parseInt(req.query.part) || allowedParts[0];
      secondsRemaining = duration && !isNaN(parseInt(duration)) ? parseInt(duration) * 60 : null;
    } else {
      // CHẾ ĐỘ FULL TEST
      allowedParts = [1, 2, 3, 4, 5, 6, 7];
      partNumber = parseInt(req.query.part) || 1;
      // secondsRemaining sẽ được lấy từ test.duration bên dưới
    }

    const test = await ToeicTest.findById(testId).populate('parts.questions');
    if (!test) {
      return res.status(404).send('Không tìm thấy đề thi');
    }

    // Gán giá trị cho full test sau khi đã có `test`
    if (!selectedParts) {
      secondsRemaining = test.duration || 7200;
    }

    const part = test.parts.find(p => p.partNumber === partNumber);
    if (!part) {
      return res.status(404).send('Không tìm thấy part');
    }

    let renderData = { test, partNumber, testId, allowedParts, secondsRemaining };

    if ([1, 2, 5].includes(partNumber)) {
      renderData.questions = part.questions;
    } else if ([3, 4, 6, 7].includes(partNumber)) {
      const groups = [];
      let groupMap = {};
      part.questions.forEach(q => {
        const key = q.groupId || q.passage || 'single';
        if (!groupMap[key]) {
          groupMap[key] = { audioUrl: q.audioUrl, passage: q.passage, imageUrl: q.imageUrl, questions: [] };
          groups.push(groupMap[key]);
        }
        groupMap[key].questions.push(q);
      });
      renderData.groups = groups;
    }

    res.render('toeic/test', {
      ...renderData,
      testName: test.title,
      isFullTest: !selectedParts,
      partContent: '' // Sẽ được điền bằng EJS include
    });
  } catch (err) {
    console.error('Lỗi server ở renderTest:', err);
    res.status(500).send('Lỗi server');
  }
};

exports.submitTest = async (req, res) => {
  try {
    const { testId, answers, startedAt, finishedAt } = req.body;
    if (!req.session || !req.session.user || !req.session.user._id) {
      return res.status(401).json({ success: false, message: 'Bạn cần đăng nhập để nộp bài.' });
    }
    const userId = req.session.user._id;
    if (!testId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: 'Dữ liệu nộp bài không hợp lệ.' });
    }

    // Lấy đáp án đúng cho các câu hỏi
    const questionIds = answers.map(a => a.questionId);
    const questions = await ToeicQuestion.find({ _id: { $in: questionIds } }).lean();

    // Chấm điểm và gom chi tiết từng câu
    let score = 0;
    let details = [];
    let partMap = {}; // { partNumber: { correct, total } }

    answers.forEach(ans => {
      const question = questions.find(q => q._id.equals(ans.questionId));
      if (!question) return;
      const isCorrect = question.correctAnswer === ans.userAnswer;
      if (isCorrect) score++;
      // Gom theo part
      const part = question.part || question.partNumber || 0;
      if (!partMap[part]) partMap[part] = { correct: 0, total: 0 };
      partMap[part].total++;
      if (isCorrect) partMap[part].correct++;

      details.push({
        questionId: question._id,
        number: question.number,
        part: part,
        userAnswer: ans.userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect
      });
    });

    // Chuẩn hóa mảng kết quả từng part
    const parts = Object.entries(partMap).map(([part, obj]) => ({
      number: part,
      correct: obj.correct,
      total: obj.total
    }));

    // Tính điểm quy đổi (ví dụ: mỗi câu đúng 990/200 điểm, tối đa 990)
    const totalScore = Math.min(Math.round(score * 990 / questions.length), 990);

    // Lưu kết quả
    const result = new ToeicResult({
      userId,
      testId,
      answers: details,
      score,
      totalQuestions: questions.length,
      startedAt,
      finishedAt
    });
    await result.save();

    // Trả về kết quả chi tiết
    res.json({
      success: true,
      totalScore,
      parts,
      details
    });
  } catch (err) {
    console.error("Lỗi khi nộp bài TOEIC:", err);
    res.status(500).json({ success: false, message: 'Lỗi server khi nộp bài. Vui lòng thử lại.', error: err.message });
  }
};

exports.listTests = async (req, res) => {
  try {
    const tests = await ToeicTest.find({});
    res.render('toeic/index', { tests });
  } catch (err) {
    res.status(500).send('Lỗi server');
  }
};

exports.renderSelectParts = async (req, res) => {
  try {
    const testId = req.query.testId;
    const test = await ToeicTest.findById(testId).populate('parts.questions');
    if (!test) return res.status(404).send('Không tìm thấy đề thi');
    res.render('toeic/select-parts', { test });
  } catch (err) {
    res.status(500).send('Lỗi server');
  }
}; 