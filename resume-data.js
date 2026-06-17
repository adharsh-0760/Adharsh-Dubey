// ==========================================
// RESUME DATA CONFIGURATION - ADHARSH DUBEY
// ==========================================
// Clean, simple, and exactly matching your resume.

const resumeData = {
  profile: {
    name: "Adharsh Dubey",
    title: "4th Year B.Tech Computer Science Student",
    specialization: "Specialization in Artificial Intelligence & Machine Learning",
    university: "VIT Bhopal University",
    avatar: "profile.jpg",
    email: "adharsh0760@gmail.com",
    linkedin: "https://www.linkedin.com/in/adharsh-dubey-604a74379",
    github: "https://github.com/adharsh-0760",
    objective: "To pursue a career in Artificial Intelligence and Machine Learning, where I can use my skills, learn continuously, and contribute to innovative technological solutions."
  },
  
  skills: {
    programming: ["Python", "C++", "SQL"],
    ml: ["Machine Learning", "Scikit-Learn", "Pandas", "NumPy", "Deep Learning"],
    tools: ["Git", "GitHub", "VS Code", "Jupyter Notebook"],
    methodologies: ["Prompt Engineering", "Vibe Coding"]
  },
  
  experience: [
    {
      role: "Machine Learning • Internship",
      company: "CodSoft",
      location: "Virtual",
      period: "Dec 2025 - Jan 2026",
      description: "Developed and deployed multiple machine learning models. Built a Credit Card Fraud classifier using SMOTE to handle high imbalance, engineered a Demographics-based Customer Churn Prediction model, and designed an NLP classifier to detect Spam SMS using TF-IDF and Naive Bayes."
    }
  ],

  projects: [
    {
      id: "credit-card-fraud",
      title: "Credit Card Fraud Detection System",
      technologies: "Python, Scikit-Learn, Pandas, SMOTE",
      period: "Dec 2025",
      description: "Developed a binary classification model to recognize fraudulent transaction activities. Addressed extreme class imbalance (99.8% genuine transactions) using SMOTE oversampling. Selected Random Forest and Logistic Regression algorithms, evaluating them using F1-score and Precision-Recall Area Under Curve (PR-AUC)."
    },
    {
      id: "customer-churn",
      title: "Bank Customer Churn Predictor",
      technologies: "Python, XGBoost, Random Forest, Pandas",
      period: "Dec 2025",
      description: "Created a customer churn classification pipeline analyzing user bank accounts, balances, and credit details. Conducted robust feature encoding, compared baseline algorithms, and optimized model hyperparameters to predict customer attrition with high precision."
    },
    {
      id: "spam-sms",
      title: "NLP Spam SMS Classifier",
      technologies: "Python, NLP, NLTK, TF-IDF, Naive Bayes",
      period: "Jan 2026",
      description: "Designed a text classification pipeline to identify spam text messages. Employed NLP text pre-processing (stop-words removal, tokenization, stemming) via NLTK, transformed texts into numerical values using TF-IDF Vectorization, and trained a Multinomial Naive Bayes model for real-time classification."
    }
  ],
  
  education: [
    {
      degree: "B.Tech in Computer Science & Engineering (AI & ML)",
      school: "VIT Bhopal University",
      period: "2023 - 2027",
      details: "Currently in 4th Year. Pursuing specialization in Artificial Intelligence and Machine Learning."
    },
    {
      degree: "Higher Secondary Education (12th Grade)",
      school: "Bridgeford School, Ranchi (CBSE Board)",
      period: "2023",
      details: "Completed 12th qualification under Central Board of Secondary Education (CBSE)."
    },
    {
      degree: "Secondary Education (10th Grade)",
      school: "Bridgeford School, Ranchi (CBSE Board)",
      period: "2020",
      details: "Completed 10th qualification under Central Board of Secondary Education (CBSE)."
    }
  ],
  
  certifications: [
    {
      id: "ibm-ml",
      title: "IBM Machine Learning In Python",
      issuer: "IBM, Virtual",
      period: "Dec 2025 - Jan 2026",
      verifyUrl: "https://www.coursera.org/account/accomplishments/verify/2ECFI49V5U6P?utm_source=android&utm_medium=certificate&utm_content=cert_image"
    },
    {
      id: "codsoft-ml",
      title: "Machine Learning Internship Certificate",
      issuer: "CodSoft, Virtual",
      period: "Dec 2025 - Jan 2026",
      verifyUrl: "ADHARSH DUBEY (1).pdf"
    }
  ],
  
  extracurricular: "Actively participated in college basketball, which helped develop teamwork, leadership, discipline, and time-management skills."
};

// Export to make it accessible in browser
window.resumeData = resumeData;
