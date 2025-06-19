// Dữ liệu bảng phiên âm IPA
const ipaData = {
    vowels: {
        front: [
            { symbol: 'i', example: 'see', vietnamese: 'i dài', description: 'Nguyên âm trước, cao, không tròn môi' },
            { symbol: 'ɪ', example: 'sit', vietnamese: 'i ngắn', description: 'Nguyên âm trước, cao-mid, không tròn môi' },
            { symbol: 'e', example: 'bed', vietnamese: 'e', description: 'Nguyên âm trước, mid, không tròn môi' },
            { symbol: 'ɛ', example: 'red', vietnamese: 'e mở', description: 'Nguyên âm trước, mid-mở, không tròn môi' },
            { symbol: 'æ', example: 'cat', vietnamese: 'a-e', description: 'Nguyên âm trước, mở, không tròn môi' },
            { symbol: 'a', example: 'father', vietnamese: 'a', description: 'Nguyên âm trước, mở, không tròn môi' }
        ],
        central: [
            { symbol: 'ɜː', example: 'bird', vietnamese: 'ơ dài', description: 'Nguyên âm giữa, mid, không tròn môi' },
            { symbol: 'ə', example: 'about', vietnamese: 'ơ ngắn', description: 'Nguyên âm giữa, mid, không tròn môi (schwa)' },
            { symbol: 'ʌ', example: 'cup', vietnamese: 'ă', description: 'Nguyên âm giữa, mid-mở, không tròn môi' }
        ],
        back: [
            { symbol: 'uː', example: 'food', vietnamese: 'u dài', description: 'Nguyên âm sau, cao, tròn môi' },
            { symbol: 'ʊ', example: 'book', vietnamese: 'u ngắn', description: 'Nguyên âm sau, cao-mid, tròn môi' },
            { symbol: 'oː', example: 'go', vietnamese: 'ô dài', description: 'Nguyên âm sau, mid, tròn môi' },
            { symbol: 'ɔː', example: 'law', vietnamese: 'ô mở', description: 'Nguyên âm sau, mid-mở, tròn môi' },
            { symbol: 'ɑː', example: 'car', vietnamese: 'a dài', description: 'Nguyên âm sau, mở, không tròn môi' }
        ]
    },
    consonants: {
        plosives: [
            { symbol: 'p', example: 'pen', vietnamese: 'p', description: 'Phụ âm tắc, môi, vô thanh' },
            { symbol: 'b', example: 'bad', vietnamese: 'b', description: 'Phụ âm tắc, môi, hữu thanh' },
            { symbol: 't', example: 'tea', vietnamese: 't', description: 'Phụ âm tắc, răng-lợi, vô thanh' },
            { symbol: 'd', example: 'dog', vietnamese: 'd', description: 'Phụ âm tắc, răng-lợi, hữu thanh' },
            { symbol: 'k', example: 'key', vietnamese: 'k', description: 'Phụ âm tắc, vòm mềm, vô thanh' },
            { symbol: 'g', example: 'go', vietnamese: 'g', description: 'Phụ âm tắc, vòm mềm, hữu thanh' }
        ],
        fricatives: [
            { symbol: 'f', example: 'fan', vietnamese: 'f', description: 'Phụ âm xát, môi-răng, vô thanh' },
            { symbol: 'v', example: 'van', vietnamese: 'v', description: 'Phụ âm xát, môi-răng, hữu thanh' },
            { symbol: 'θ', example: 'thin', vietnamese: 'th', description: 'Phụ âm xát, răng, vô thanh' },
            { symbol: 'ð', example: 'this', vietnamese: 'th', description: 'Phụ âm xát, răng, hữu thanh' },
            { symbol: 's', example: 'see', vietnamese: 's', description: 'Phụ âm xát, răng-lợi, vô thanh' },
            { symbol: 'z', example: 'zoo', vietnamese: 'z', description: 'Phụ âm xát, răng-lợi, hữu thanh' },
            { symbol: 'ʃ', example: 'ship', vietnamese: 'sh', description: 'Phụ âm xát, vòm cứng, vô thanh' },
            { symbol: 'ʒ', example: 'vision', vietnamese: 'zh', description: 'Phụ âm xát, vòm cứng, hữu thanh' },
            { symbol: 'h', example: 'hat', vietnamese: 'h', description: 'Phụ âm xát, thanh hầu, vô thanh' }
        ],
        affricates: [
            { symbol: 'tʃ', example: 'chair', vietnamese: 'ch', description: 'Phụ âm tắc-xát, vòm cứng, vô thanh' },
            { symbol: 'dʒ', example: 'job', vietnamese: 'j', description: 'Phụ âm tắc-xát, vòm cứng, hữu thanh' }
        ],
        nasals: [
            { symbol: 'm', example: 'man', vietnamese: 'm', description: 'Phụ âm mũi, môi, hữu thanh' },
            { symbol: 'n', example: 'no', vietnamese: 'n', description: 'Phụ âm mũi, răng-lợi, hữu thanh' },
            { symbol: 'ŋ', example: 'sing', vietnamese: 'ng', description: 'Phụ âm mũi, vòm mềm, hữu thanh' }
        ],
        approximants: [
            { symbol: 'l', example: 'leg', vietnamese: 'l', description: 'Phụ âm bên, răng-lợi, hữu thanh' },
            { symbol: 'r', example: 'red', vietnamese: 'r', description: 'Phụ âm tiếp cận, răng-lợi, hữu thanh' },
            { symbol: 'j', example: 'yes', vietnamese: 'y', description: 'Phụ âm tiếp cận, vòm cứng, hữu thanh' },
            { symbol: 'w', example: 'wet', vietnamese: 'w', description: 'Phụ âm tiếp cận, môi-vòm mềm, hữu thanh' }
        ]
    },
    diphthongs: [
        { symbol: 'eɪ', example: 'face', vietnamese: 'ei', description: 'Nguyên âm đôi, từ e đến i' },
        { symbol: 'aɪ', example: 'price', vietnamese: 'ai', description: 'Nguyên âm đôi, từ a đến i' },
        { symbol: 'ɔɪ', example: 'boy', vietnamese: 'oi', description: 'Nguyên âm đôi, từ o đến i' },
        { symbol: 'əʊ', example: 'goat', vietnamese: 'ou', description: 'Nguyên âm đôi, từ ơ đến u' },
        { symbol: 'aʊ', example: 'mouth', vietnamese: 'au', description: 'Nguyên âm đôi, từ a đến u' },
        { symbol: 'ɪə', example: 'near', vietnamese: 'ia', description: 'Nguyên âm đôi, từ i đến ơ' },
        { symbol: 'eə', example: 'square', vietnamese: 'ea', description: 'Nguyên âm đôi, từ e đến ơ' },
        { symbol: 'ʊə', example: 'poor', vietnamese: 'ua', description: 'Nguyên âm đôi, từ u đến ơ' }
    ]
};

// Hiển thị bảng phiên âm IPA
exports.getIPATable = (req, res) => {
    res.render('ipa/index', {
        title: 'Bảng phiên âm IPA',
        ipaData,
        user: req.session.user
    });
};

// Hiển thị trang luyện tập IPA
exports.getIPAPractice = (req, res) => {
    // Tạo câu hỏi ngẫu nhiên
    const allSymbols = [];
    
    // Thêm nguyên âm
    Object.values(ipaData.vowels).forEach(category => {
        category.forEach(vowel => {
            allSymbols.push({
                symbol: vowel.symbol,
                example: vowel.example,
                type: 'vowel'
            });
        });
    });
    
    // Thêm phụ âm
    Object.values(ipaData.consonants).forEach(category => {
        category.forEach(consonant => {
            allSymbols.push({
                symbol: consonant.symbol,
                example: consonant.example,
                type: 'consonant'
            });
        });
    });
    
    // Thêm nguyên âm đôi
    ipaData.diphthongs.forEach(diphthong => {
        allSymbols.push({
            symbol: diphthong.symbol,
            example: diphthong.example,
            type: 'diphthong'
        });
    });
    
    // Chọn ngẫu nhiên 10 câu hỏi
    const questions = [];
    const shuffled = allSymbols.sort(() => 0.5 - Math.random());
    
    for (let i = 0; i < Math.min(10, shuffled.length); i++) {
        const symbol = shuffled[i];
        const options = [symbol.example];
        
        // Tạo các lựa chọn sai
        while (options.length < 4) {
            const randomSymbol = allSymbols[Math.floor(Math.random() * allSymbols.length)];
            if (!options.includes(randomSymbol.example)) {
                options.push(randomSymbol.example);
            }
        }
        
        // Xáo trộn các lựa chọn
        const shuffledOptions = options.sort(() => 0.5 - Math.random());
        
        questions.push({
            symbol: symbol.symbol,
            correctAnswer: symbol.example,
            options: shuffledOptions,
            type: symbol.type
        });
    }
    
    res.render('ipa/practice', {
        title: 'Luyện tập IPA',
        questions,
        user: req.session.user
    });
};

// Kiểm tra kết quả luyện tập
exports.checkIPAPractice = (req, res) => {
    const answers = req.body.answers || [];
    const questions = req.body.questions || [];
    
    let score = 0;
    const results = [];
    
    questions.forEach((question, index) => {
        const userAnswer = answers[index];
        const isCorrect = userAnswer === question.correctAnswer;
        
        if (isCorrect) {
            score++;
        }
        
        results.push({
            symbol: question.symbol,
            userAnswer,
            correctAnswer: question.correctAnswer,
            isCorrect,
            type: question.type
        });
    });
    
    const percentage = Math.round((score / questions.length) * 100);
    
    res.render('ipa/results', {
        title: 'Kết quả luyện tập IPA',
        score,
        total: questions.length,
        percentage,
        results,
        user: req.session.user
    });
}; 