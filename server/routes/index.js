const express = require('express');
const router = express.Router();

// Sample data for resources
const resources = [
  { 
    id: 1, 
    title: 'Machine Learning Crash Course', 
    url: 'https://developers.google.com/machine-learning/crash-course',
    category: 'Beginner',
    description: 'Google\'s fast-paced, practical introduction to machine learning',
    image: 'https://via.placeholder.com/300x200?text=ML+Crash+Course',
    rating: 4.8
  },
  { 
    id: 2, 
    title: 'Deep Learning Specialization', 
    url: 'https://www.coursera.org/specializations/deep-learning',
    category: 'Intermediate',
    description: 'Andrew Ng\'s comprehensive deep learning course series',
    image: 'https://via.placeholder.com/300x200?text=Deep+Learning',
    rating: 4.9
  },
  { 
    id: 3, 
    title: 'Fast.ai Practical Deep Learning', 
    url: 'https://www.fast.ai/',
    category: 'Intermediate',
    description: 'Practical deep learning for coders with real-world applications',
    image: 'https://via.placeholder.com/300x200?text=Fast.ai',
    rating: 4.7
  },
  { 
    id: 4, 
    title: 'TensorFlow Documentation', 
    url: 'https://www.tensorflow.org/learn',
    category: 'Advanced',
    description: 'Official documentation and tutorials for TensorFlow',
    image: 'https://via.placeholder.com/300x200?text=TensorFlow',
    rating: 4.5
  },
  { 
    id: 5, 
    title: 'PyTorch Tutorials', 
    url: 'https://pytorch.org/tutorials/',
    category: 'Advanced',
    description: 'Comprehensive tutorials for PyTorch framework',
    image: 'https://via.placeholder.com/300x200?text=PyTorch',
    rating: 4.6
  },
  { 
    id: 6, 
    title: 'Kaggle Learn', 
    url: 'https://www.kaggle.com/learn',
    category: 'Beginner',
    description: 'Free courses on machine learning, deep learning, and data science',
    image: 'https://via.placeholder.com/300x200?text=Kaggle',
    rating: 4.7
  }
];

// Sample data for videos
const videos = [
  {
    id: 1,
    title: 'Neural Networks Explained',
    url: 'https://www.youtube.com/watch?v=example1',
    category: 'Beginner',
    description: 'A simple explanation of how neural networks work',
    thumbnail: 'https://via.placeholder.com/300x200?text=Neural+Networks',
    rating: 4.8,
    duration: '15 mins'
  },
  {
    id: 2,
    title: 'Deep Learning with TensorFlow',
    url: 'https://www.youtube.com/watch?v=example2',
    category: 'Intermediate',
    description: 'Learn how to build deep learning models with TensorFlow',
    thumbnail: 'https://via.placeholder.com/300x200?text=TensorFlow',
    rating: 4.7,
    duration: '45 mins'
  },
  {
    id: 3,
    title: 'Computer Vision Fundamentals',
    url: 'https://www.youtube.com/watch?v=example3',
    category: 'Intermediate',
    description: 'Introduction to computer vision concepts and applications',
    thumbnail: 'https://via.placeholder.com/300x200?text=Computer+Vision',
    rating: 4.9,
    duration: '30 mins'
  },
  {
    id: 4,
    title: 'Natural Language Processing',
    url: 'https://www.youtube.com/watch?v=example4',
    category: 'Advanced',
    description: 'Advanced techniques in natural language processing',
    thumbnail: 'https://via.placeholder.com/300x200?text=NLP',
    rating: 4.6,
    duration: '60 mins'
  },
  {
    id: 5,
    title: 'Reinforcement Learning',
    url: 'https://www.youtube.com/watch?v=example5',
    category: 'Advanced',
    description: 'Introduction to reinforcement learning algorithms',
    thumbnail: 'https://via.placeholder.com/300x200?text=RL',
    rating: 4.5,
    duration: '50 mins'
  },
  {
    id: 6,
    title: 'Python for Data Science',
    url: 'https://www.youtube.com/watch?v=example6',
    category: 'Beginner',
    description: 'Learn Python basics for data science and machine learning',
    thumbnail: 'https://via.placeholder.com/300x200?text=Python',
    rating: 4.7,
    duration: '40 mins'
  }
];

// Home page
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'AI/ML Learning Hub',
    currentPage: 'home'
  });
});

// Introduction page
router.get('/introduction', (req, res) => {
  res.render('introduction', { 
    title: 'Introduction to AI/ML',
    currentPage: 'introduction'
  });
});

// Resources page
router.get('/resources', (req, res) => {
  res.render('resources', { 
    title: 'AI/ML Resources',
    currentPage: 'resources',
    resources: resources
  });
});

// Learning Roadmap page
router.get('/roadmap', (req, res) => {
  res.render('roadmap', { 
    title: 'AI/ML Learning Roadmap',
    currentPage: 'roadmap'
  });
});

// Videos page
router.get('/videos', (req, res) => {
  res.render('videos', { 
    title: 'AI/ML Videos',
    currentPage: 'videos',
    videos: videos
  });
});

// API endpoints for interactive features
router.get('/api/resources', (req, res) => {
  res.json(resources);
});

router.get('/api/videos', (req, res) => {
  res.json(videos);
});

module.exports = router; 