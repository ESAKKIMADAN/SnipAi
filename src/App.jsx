import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import snipaiLogo from "./images/snipai2.jpg"
const COLORS = {
  background: "#1A1A1A",
  sidebar: "#121212",
  card: "#2B2B2B",
  accent: "#F97316",
  text: "#FFFFFF",
};

const meetings = [
  { id: 1, name: "Meeting - AI introduction", date: "Apr 23, 2025 ", transcription: "Transcript 1...", isCodingRelated: true },
  { id: 2, name: "Meeting - AI-Powered Resume", date: "Apr 23, 2025 ", transcription: "Transcript 2...", isCodingRelated: false },
  { id: 3, name: "Meeting - Smart Health Tracker", date: "Apr 24, 2025 ", transcription: " We need the app to sync data from wearables like Fitbit and Apple Watch. Apple HealthKit API supports heart rate, step count, and sleep tracking.Google Fit API will mirror those features for Android.Where do we store the health logs?Use TimescaleDB to handle time-series data efficiently."
, isCodingRelated: true },
];

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <div style={{
      width: 240, background: COLORS.sidebar, height: '100vh',
      padding: 20, boxSizing: 'border-box', display: 'flex',
      flexDirection: 'column', borderRight: '1px solid #333'
    }}>
      <div onClick={() => setActiveTab("Dashboard")}
        style={{ display: 'flex', alignItems: 'center', marginBottom: 20, cursor: 'pointer' }}>
       <img src={snipaiLogo} alt="Logo" style={{ width: 50, height: 50, borderRadius: 12, marginRight: 10 }} />

        <h2 style={{ color: COLORS.text, margin: 0 }}>SnipAI</h2>
      </div>

      {["Dashboard", "Meetings", "Tasks", "Mock Tests", "Code Practice", "Progress"].map(tab => (
        <button key={tab}
          onClick={() => setActiveTab(tab)}
          style={{
            background: 'none',
            color: activeTab === tab ? COLORS.accent : COLORS.text,
            border: 'none', padding: '10px 0', textAlign: 'left',
            fontWeight: activeTab === tab ? 'bold' : 'normal',
            cursor: 'pointer'
          }}>
          {tab}
        </button>
      ))}
    </div>
  );
}

function DashboardPanel() {
  const [zoomLink, setZoomLink] = useState('');
  const [botName, setBotName] = useState('');

  const handleCreateBot = () => {
    console.log(`Creating bot with Zoom Link: ${zoomLink} and Bot Name: ${botName}`);
    // Add logic to create bot here
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 style={{ color: COLORS.accent, marginBottom: 20 }}>Dashboard</h1>
      <div style={{ background: COLORS.card, padding: 20, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
        <h2 style={{ color: COLORS.accent, marginBottom: 10 }}>Create a Zoom Bot</h2>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="zoomLink" style={{ color: COLORS.text }}>Zoom Link:</label>
          <input
            type="url"
            id="zoomLink"
            value={zoomLink}
            onChange={(e) => setZoomLink(e.target.value)}
            placeholder="Enter Zoom Link"
            style={{
              width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: COLORS.background, color: COLORS.text
            }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="botName" style={{ color: COLORS.text }}>Bot Name:</label>
          <input
            type="text"
            id="botName"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            placeholder="Enter Bot Name"
            style={{
              width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', background: COLORS.background, color: COLORS.text
            }}
          />
        </div>
        <button onClick={handleCreateBot}
          style={{
            background: COLORS.accent, color: COLORS.text, padding: '10px 20px', border: 'none', borderRadius: '10px', cursor: 'pointer'
          }}>
          Create Bot
        </button>
      </div>
    </div>
  );
}

function MeetingsPanel() {
  const [sel, setSel] = useState(null);
  if (sel) {
    return (
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <button onClick={() => setSel(null)}
          style={{ background: COLORS.accent, color: COLORS.text, padding: '8px 16px', border: 'none', borderRadius: '12px', cursor: 'pointer', marginBottom: 20 }}>
          Back
        </button>
        <div style={{ background: COLORS.card, borderRadius: 8, padding: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          <h2 style={{ color: COLORS.accent, marginBottom: 10 }}>{sel.name} — {sel.date}</h2>
          <h3>Transcription</h3>
          <p style={{ marginBottom: 20 }}>{sel.transcription}</p>
          <h3>Summary</h3>
          <p>The meeting focused on syncing health data from wearables via Apple HealthKit and Google Fit APIs. Data such as heart rate and steps will be stored using TimescaleDB, optimized for time-series data.
          </p>
          <button style={{ background: COLORS.accent, color: COLORS.text, padding: '10px 20px', border: 'none', borderRadius: 4, cursor: 'pointer', marginBottom: 20 }}>
            Download PDF
          </button>
          {sel.isCodingRelated && (
            <>
              <h3 style={{ color: COLORS.text, marginBottom: 10 }}>Architecture Diagram</h3>
              <div style={{ height: 200, background: '#333', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#777' }}>
                [Diagram here]
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ color: COLORS.accent, marginBottom: 20 }}>Meetings</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {meetings.map(m => (
          <button key={m.id} onClick={() => setSel(m)}
            style={{
              padding: '20px', background: COLORS.card, color: COLORS.text,
              borderRadius: '12px', textAlign: 'left', cursor: 'pointer',
              fontSize: '18px', border: 'none',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}>
            <strong>{m.name}</strong><br />
            <small style={{ color: '#777' }}>{m.date}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

function TasksPanel() {
  const [sel, setSel] = useState(null);
  if (sel) {
    const todoItems = ['Integrate Apple HealthKit and Google Fit APIs to fetch heart rate, steps, and sleep data', 'Set up a React Native dashboard to display daily and weekly health metrics.', 'Store and manage time-series data using TimescaleDB with user_id, timestamp, metric_type, and value.'];
    return (
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <button onClick={() => setSel(null)}
          style={{ background: COLORS.accent, color: COLORS.text, padding: '8px 16px', border: 'none', borderRadius: '12px', cursor: 'pointer', marginBottom: 20 }}>
          Back
        </button>
        <div style={{ background: COLORS.card, borderRadius: 8, padding: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          <h2 style={{ color: COLORS.accent, marginBottom: 10 }}>{sel.name} — {sel.date}</h2>
          <h3 style={{ color: COLORS.text }}>To-Do List</h3>
          <div style={{ marginBottom: 20 }}>
            {todoItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
                <input type="checkbox" style={{ marginRight: 10 }} />
                <span style={{ flex: 1, color: COLORS.text }}>{item}</span>
                <button style={{ background: COLORS.accent, color: COLORS.text, border: 'none', borderRadius: 12, padding: '6px 12px', cursor: 'pointer' }}>
                  Answers
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 style={{ color: COLORS.accent, marginBottom: 20 }}>Tasks</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {meetings.map((m) => (
          <button key={m.id} onClick={() => setSel(m)}
            style={{
              padding: '20px', background: COLORS.card, color: COLORS.text,
              borderRadius: '12px', textAlign: 'left', cursor: 'pointer',
              fontSize: '18px', border: 'none',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
            }}>
            <strong>{m.name}</strong><br />
            <small style={{ color: '#777' }}>{m.date}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

export function MockTestsPanel({ setStage }) {
  const [phase, setPhase] = useState("list");
  const [userAnswers, setUserAnswers] = useState({});
  
  const questions = [
    { id: 1, question: "Best structure for storing continuous health logs with timestamps?", options: ["HashMap", " Linked List", "Time-indexed DB / Array of Tuples","Trie"], correct: 2 },
    { id: 2, question: "For syncing large data efficiently from devices, use:", options: [" Recursive sorting", "Incremental fetch using Timestamps", "Hash collisions","DFS"], correct: 1 },
    { id: 3, question: "Which algorithm optimizes time-series data compression?", options: ["Huffman Coding", "Delta Encoding", " Bellman-Ford","Rabin-Karp"], correct: 1 }
  ];

  const handleAnswer = (qid, ansIndex) => {
    setUserAnswers({ ...userAnswers, [qid]: ansIndex });
  };

  const score = Object.keys(userAnswers).reduce((acc, qid) => {
    const q = questions.find(q => q.id === parseInt(qid));
    return acc + (q && q.correct === userAnswers[qid] ? 1 : 0);
  }, 0);

  if (phase === "questions") {
    return (
      <div style={{ padding: 20, color: COLORS.text }}>
        <h1 style={{ color: COLORS.accent }}>Mock Test</h1>
        {questions.map(q => (
          <div key={q.id} style={{ marginBottom: 20 }}>
            <p>{q.question}</p>
            {q.options.map((opt, idx) => (
              <button key={idx}
                onClick={() => handleAnswer(q.id, idx)}
                style={{
                  background: userAnswers[q.id] === idx ? COLORS.accent : COLORS.card,
                  color: COLORS.text,
                  padding: '10px 20px',
                  borderRadius: 10,
                  border: 'none',
                  marginRight: 10,
                  cursor: 'pointer'
                }}>
                {opt}
              </button>
            ))}
          </div>
        ))}
        <button onClick={() => setPhase("report")}
          style={{
            background: COLORS.accent,
            color: COLORS.text,
            padding: '10px 20px',
            borderRadius: 10,
            border: 'none',
            marginTop: 20,
            cursor: 'pointer'
          }}>
          Submit Test
        </button>
      </div>
    );
  }

  if (phase === "report") {
    return (
      <div style={{ padding: 20, color: COLORS.text }}>
        <button onClick={() => setPhase("list")}
          style={{ marginBottom: 20, background: COLORS.accent, color: COLORS.text, padding: '8px 16px', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>
          Back
        </button>
        <h1 style={{ color: COLORS.accent, marginBottom: 20 }}>Test Report</h1>
        <div style={{
          background: COLORS.card,
          padding: 20,
          borderRadius: 12,
          marginBottom: 30,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ margin: 0 }}>Score: {score} / {questions.length}</h2>
          <span style={{
            background: COLORS.accent,
            padding: '6px 16px',
            borderRadius: 12,
            fontWeight: 'bold'
          }}>
            {Math.round((score / questions.length) * 100)}%
          </span>
        </div>

        {questions.map(q => {
          const userAns = userAnswers[q.id];
          const isCorrect = userAns === q.correct;
          return (
            <div key={q.id} style={{
              background: COLORS.card,
              padding: 20,
              borderRadius: 10,
              marginBottom: 20,
              borderLeft: `6px solid ${isCorrect ? 'green' : 'red'}`
            }}>
              <p style={{ fontWeight: 'bold' }}>{q.question}</p>
              <p>
                Your Answer: <strong style={{ color: isCorrect ? 'lightgreen' : 'tomato' }}>
                  {q.options[userAns] || "No Answer"}
                </strong>
              </p>
              <p>Correct Answer: <strong>{q.options[q.correct]}</strong></p>
            </div>
          );
        })}

        <button onClick={() => setPhase("chatbot")}
          style={{
            background: COLORS.accent,
            color: COLORS.text,
            padding: '12px 24px',
            borderRadius: 10,
            border: 'none',
            marginTop: 20,
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
          Have a Question?
        </button>
      </div>
    );
  }

  if (phase === "chatbot") {
    return (
      <div style={{ padding: 20, color: COLORS.text }}>
        <button onClick={() => setPhase("list")}
          style={{ marginBottom: 20, background: COLORS.accent, color: COLORS.text, padding: '8px 16px', border: 'none', borderRadius: '12px', cursor: 'pointer' }}>
          Back
        </button>
        <h1 style={{ color: COLORS.accent }}>Q&A Chatbot</h1>
        <div style={{ height: 300, background: COLORS.card, padding: 20, borderRadius: 10, color: '#aaa' }}>
          [Chatbot UI Placeholder]
        </div>
      </div>
    );
  }

  // Default "list" phase UI
  return (
    <div style={{ padding: 20 }}>
      {/* Topic Heading */}
      <h1 style={{ color: COLORS.accent, marginBottom: 20 }}>Mock Test List</h1>
  
      {/* Mock Test 1 Card */}
      
      <div style={{ background: COLORS.card, borderRadius: 8, padding: 30, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}><h2 style={{ margin: 10, color: COLORS.text }}>Meeting - AI-Powered Resume </h2>
        <button onClick={() => setPhase("questions")}
          style={{
            background: COLORS.accent,
            color: COLORS.text,
            padding: '10px 20px',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer'
          }}>
          Start Test
        </button></div>
       <div style={{ background: COLORS.card, borderRadius: 8, padding: 40, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}> <h2 style={{ margin: 100, color: COLORS.text }}>Meeting - Smart Health Tracker </h2>
        <button onClick={() => setPhase("questions")}
          style={{
            background: COLORS.accent,
            color: COLORS.text,
            padding: '10px 20px',
            borderRadius: 8,
            border: 'none',
            cursor: 'pointer'
          }}>
          Start Test
        </button>
        </div>
      
    </div>
  );
  
  
  
}

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const renderMain = () => {
    switch (activeTab) {
      case 'Dashboard': return <DashboardPanel />;
      case 'Meetings': return <MeetingsPanel />;
      case 'Tasks': return <TasksPanel />;
      case 'Mock Tests': return <MockTestsPanel />;
      case 'Code Practice': return <div>Code Practice…</div>;
      case 'Progress': return <div>Progress…</div>;
      default: return null;
    }
  };
  return (
    <div style={{
      display: 'flex', width: '100vw', height: '100vh',
      background: COLORS.background, color: COLORS.text
    }}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main style={{ flex: 1, padding: 40, overflowY: 'auto' }}>{renderMain()}</main>
    </div>
  );
}

// This part renders the app (remove if you only want to export)
// ✅ Good (at top level)
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

// 👇 Export the component

// This stays as your default export
export default App;


