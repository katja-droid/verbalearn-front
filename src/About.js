import React from 'react'

const About = () => {
  return (
    <div className="container mt-5">
        <h1 className="text-center mb-4">About us</h1>
        <img class="img-fluid" style={{margin: '20px'}} height="50vh" src="/study.webp"/>
        
        <div class="row">
            <div class="col">
                <h2>Why VerbaLearn?</h2>
                <p>VerbaLearn is designed with the latest in educational technology to provide an effective, engaging, and personalized learning experience. Here’s what makes us unique:</p>
                <ul>
                    <li><strong>Interactive Lessons:</strong> Dive into language learning with lessons that keep you engaged and motivated at every step.</li>
                    <li><strong>Speech Recognition Tools:</strong> Perfect your pronunciation with our advanced voice recognition technology.</li>
                    <li><strong>Personalized Learning Paths:</strong> Tailor your learning experience with lessons designed around your personal goals and interests.</li>
                    <li><strong>Cultural Insights:</strong> Understand the language deeply through cultural notes and real-life scenarios.</li>
                </ul>
            </div>
        </div>

        <p>Join millions of users worldwide who are navigating new languages with VerbaLearn. Whether you're preparing for travel, advancing your career, enhancing your education, or simply pursuing personal growth, VerbaLearn is here to support your language learning journey every step of the way.

Let's break the language barrier together! Explore our diverse range of languages, immerse yourself in interactive lessons, and unlock the skills you need to succeed in today's globalized world. With VerbaLearn, language learning is not just a task, but an enriching experience.

Join us and discover the joy of learning and connecting through language. Start your journey with VerbaLearn today.</p>
   
      
    </div>
  )
}

export default About
