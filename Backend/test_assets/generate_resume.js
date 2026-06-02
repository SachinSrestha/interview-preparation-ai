const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
<style>
  body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: auto; padding: 40px; }
  h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-bottom: 10px; }
  h2 { color: #2980b9; margin-top: 25px; margin-bottom: 10px; }
  .contact { font-size: 0.95em; color: #555; margin-bottom: 25px; }
  .section { margin-bottom: 25px; }
  .job { margin-bottom: 20px; }
  .job-title { font-weight: bold; font-size: 1.1em; color: #34495e; }
  .job-date { float: right; color: #7f8c8d; font-style: italic; }
  ul { margin-top: 8px; padding-left: 20px; }
  li { margin-bottom: 5px; }
</style>
</head>
<body>
  <h1>Alex Developer</h1>
  <div class="contact">Email: alex.developer@example.com | Phone: (555) 123-4567 | GitHub: github.com/alexdev | LinkedIn: linkedin.com/in/alexdev</div>
  
  <div class="section">
    <h2>Professional Summary</h2>
    <p>Software Engineer with 4 years of experience specializing in the MERN stack. Proven track record of developing scalable backend services, designing intuitive React interfaces, and integrating modern AI services into production applications. Adept at problem-solving and writing clean, maintainable code.</p>
  </div>

  <div class="section">
    <h2>Experience</h2>
    <div class="job">
      <span class="job-title">Full Stack Developer | TechInnovate Inc.</span>
      <span class="job-date">Jan 2021 - Present</span>
      <ul>
        <li>Architected and deployed a scalable backend architecture using Node.js and Express, improving system throughput by 40%.</li>
        <li>Developed dynamic and responsive front-end dashboards using React.js and Redux.</li>
        <li>Integrated OpenAI and Google GenAI APIs for automated data analysis and chatbot features.</li>
        <li>Optimized MongoDB queries and implemented advanced indexing, reducing average response times by 35%.</li>
      </ul>
    </div>
    <div class="job">
      <span class="job-title">Junior Web Developer | WebSolutions LLC</span>
      <span class="job-date">Jun 2019 - Dec 2020</span>
      <ul>
        <li>Maintained and updated existing MongoDB databases, ensuring data integrity and performance.</li>
        <li>Built robust RESTful APIs to support various client-facing features.</li>
        <li>Wrote comprehensive unit and integration tests using Jest, achieving 85% code coverage.</li>
      </ul>
    </div>
  </div>

  <div class="section">
    <h2>Education</h2>
    <div class="job">
      <span class="job-title">B.S. in Computer Science | University of Technology</span>
      <span class="job-date">Graduated: May 2019</span>
    </div>
  </div>

  <div class="section">
    <h2>Skills</h2>
    <p><strong>Languages:</strong> JavaScript (ES6+), TypeScript, HTML5, CSS3, Python</p>
    <p><strong>Technologies:</strong> Node.js, Express, React, MongoDB, Mongoose, Git, Docker, AWS, REST APIs</p>
  </div>
</body>
</html>
`;

async function generatePdf() {
    console.log("Launching puppeteer...");
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    const outputPath = path.join(__dirname, 'resume.pdf');
    await page.pdf({
        path: outputPath,
        format: 'A4',
        margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }
    });

    await browser.close();
    console.log("PDF generated successfully at:", outputPath);
}

generatePdf().catch(console.error);
