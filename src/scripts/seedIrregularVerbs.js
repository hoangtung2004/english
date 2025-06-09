const mongoose = require('mongoose');
const IrregularVerb = require('../models/IrregularVerb');

mongoose.connect('mongodb://localhost:27017/english-learning', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const verbs = [
  { v1: 'abide', v2: 'abode/abided', v3: 'abode/abided', meaning: 'lưu trú, lưu lại' },
  { v1: 'arise', v2: 'arose', v3: 'arisen', meaning: 'phát sinh' },
  { v1: 'awake', v2: 'awoke', v3: 'awoken', meaning: 'đánh thức, thức' },
  { v1: 'backslide', v2: 'backslid', v3: 'backslide/backslid', meaning: 'tái phạm' },
  { v1: 'be', v2: 'was/were', v3: 'been', meaning: 'thì, là, bị, ở' },
  { v1: 'bear', v2: 'bore', v3: 'borne', meaning: 'mang, chịu đựng' },
  { v1: 'beat', v2: 'beat', v3: 'beaten/beat', meaning: 'đánh, đập' },
  { v1: 'become', v2: 'became', v3: 'become', meaning: 'trở nên' }
];

IrregularVerb.insertMany(verbs)
  .then(() => {
    console.log('Đã thêm dữ liệu mẫu động từ bất quy tắc!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    mongoose.disconnect();
  }); 