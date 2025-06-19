const mongoose = require('mongoose');
const VocabularyLesson = require('../models/VocabularyLesson');

async function fixImagePaths() {
    try {
        // Kết nối MongoDB
        await mongoose.connect('mongodb://localhost:27017/english-learning');
        console.log('Đã kết nối với MongoDB');

        // Lấy tất cả các bài học
        const lessons = await VocabularyLesson.find({});
        console.log(`Tìm thấy ${lessons.length} bài học`);

        // Sửa đường dẫn ảnh
        for (const lesson of lessons) {
            if (lesson.image) {
                // Nếu là URL bên ngoài, chuyển thành đường dẫn local
                if (lesson.image.includes('freepik.com')) {
                    // Tạo đường dẫn local dựa trên tên bài học
                    const lessonNumber = lesson.name.match(/\d+/)?.[0] || '1';
                    lesson.image = `/images/set1/lessons/lesson${lessonNumber}.jpg`;
                    await lesson.save();
                    console.log(`Đã chuyển URL freepik thành đường dẫn local cho bài học ${lesson.name}: ${lesson.image}`);
                    continue;
                }

                // Nếu là đường dẫn local, đảm bảo format đúng
                if (!lesson.image.startsWith('/images/')) {
                    // Tách đường dẫn thành các phần
                    const parts = lesson.image.split('/');
                    if (parts.length >= 3) {
                        // Lấy tên file và thư mục
                        let filename = parts.pop(); // lesson1.jpg
                        const type = parts.pop(); // lessons
                        const set = parts.pop(); // set1
                        
                        // Sửa lỗi định dạng file (ví dụ: lesson52.jpg.jpg -> lesson52.jpg)
                        if (filename.endsWith('.jpg.jpg')) {
                            filename = filename.replace('.jpg.jpg', '.jpg');
                        }
                        
                        // Tạo đường dẫn mới
                        lesson.image = `/images/${set}/${type}/${filename}`;
                        await lesson.save();
                        console.log(`Đã sửa đường dẫn ảnh cho bài học ${lesson.name}: ${lesson.image}`);
                    }
                }
            }
        }

        console.log('Đã sửa xong tất cả đường dẫn ảnh');
        mongoose.disconnect();
    } catch (error) {
        console.error('Lỗi:', error);
        mongoose.disconnect();
    }
}

fixImagePaths(); 