const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// === CRITICAL: Serve static files from public folder ===
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Courses data
const courses = [
  { name: 'B.Tech Computer Science', duration: '4 Years', desc: 'Programming, AI, Data Science & Cloud Computing' },
  { name: 'Architecture ', duration: '3 Years', desc: 'Design , And Making Arts' },
  { name: 'B voc', duration: '3 Years', desc: 'industry-specific practical skills rather than traditional theory' },
  { name: 'MBA', duration: '2 Years', desc: 'Marketing, HR & Business Strategy' }
];

let applications = [];

// Routes
app.get('/', (req, res) => res.render('home'));
app.get('/about', (req, res) => res.render('about'));
app.get('/courses', (req, res) => res.render('courses', { courses }));
app.get('/admissions', (req, res) => {
  const submitted = req.query.submitted === 'true';
  res.render('admissions', { submitted, courses });
});
app.get('/contact', (req, res) => {
  const submitted = req.query.submitted === 'true';
  res.render('contact', { submitted });
});
app.get('/applications', (req, res) => res.render('applications', { applications }));

// Form submissions
app.post('/submit-application', (req, res) => {
  const newApplication = {
    id: Date.now().toString(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    course: req.body.course,
    date: new Date().toLocaleString('en-IN')
  };
  applications.push(newApplication);
  res.redirect('/admissions?submitted=true');
});

app.post('/submit-contact', (req, res) => {
  console.log('New Contact:', req.body);
  res.redirect('/contact?submitted=true');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});