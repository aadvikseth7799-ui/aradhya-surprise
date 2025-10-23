// Aradhya Proposal Website - Single-file React component
// How to use:
// 1) Create a React project (Vite, Create React App). Tailwind is optional but classes are used here — if Tailwind isn't installed the layout will still work with basic CSS.
// 2) Paste this file as `App.jsx` (or another component) and import it in your app.
// 3) Run `npm run dev` or `npm start` to preview. You can host on GitHub Pages / Netlify / Vercel.

import React, { useState, useRef } from "react";

export default function AradhyaProposal() {
  const [revealed, setRevealed] = useState(false);
  const [accepted, setAccepted] = useState(null); // null / true / false
  const [customMsg, setCustomMsg] = useState("Will you be mine?");
  const confettiRef = useRef(null);

  function playConfetti() {
    const el = confettiRef.current;
    if (!el) return;
    const emojis = ["🎉", "🏸", "💖", "✨"];
    for (let i = 0; i < 40; i++) {
      const span = document.createElement("span");
      span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      span.style.position = "absolute";
      span.style.left = Math.random() * 80 + "%";
      span.style.top = "10%";
      span.style.fontSize = Math.random() * 24 + 12 + "px";
      span.style.opacity = 1;
      span.style.transform = `translateY(0) rotate(${Math.random() * 360}deg)`;
      span.style.transition = `transform 2s ease-out, opacity 2s ease-out`;
      el.appendChild(span);
      setTimeout(() => {
        span.style.transform = `translateY(${500 + Math.random() * 300}px) rotate(${Math.random() * 720}deg)`;
        span.style.opacity = 0;
      }, 50 + Math.random() * 200);
      setTimeout(() => el.removeChild(span), 2500);
    }
  }

  function handleAccept(choice) {
    setAccepted(choice);
    playConfetti();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-indigo-50 p-6">
      <div className="max-w-3xl w-full rounded-2xl shadow-2xl bg-white p-6 relative overflow-hidden">
        {/* Decorative shuttlecock top-left */}
        <svg className="absolute left-6 top-6 w-20 opacity-30" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(6,6)">
            <path d="M28 2c-3 0-7 2-10 5l14 14 11-11c-4-4-12-8-15-8z" fill="#FF8FA3" />
            <ellipse cx="28" cy="40" rx="8" ry="6" fill="#333" />
          </g>
        </svg>

        <div ref={confettiRef} className="pointer-events-none absolute inset-0"></div>

        <header className="flex items-center gap-4">
          <div className="rounded-full bg-gradient-to-br from-pink-400 to-indigo-500 p-3 shadow-lg">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12s4 6 10 6 10-6 10-6-4-6-10-6S2 12 2 12z" fill="#fff"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">A Special Message for Aradhya</h1>
            <p className="text-sm text-gray-600">Made with ❤️ (and a love for badminton)</p>
          </div>
        </header>

        <main className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="p-4 rounded-xl bg-gradient-to-br from-white to-pink-50 shadow-inner">
            <h2 className="font-semibold text-lg">Why I chose badminton as our theme</h2>
            <p className="mt-2 text-gray-700">Because you love it — the energy, the focus, the fun. Every rally reminds me of how I want our conversations to be: back-and-forth, playful and full of heart.</p>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Customize the proposal message</label>
              <input value={customMsg} onChange={(e)=>setCustomMsg(e.target.value)} className="mt-1 w-full rounded-md border px-3 py-2" />
            </div>

            <div className="mt-4 flex gap-2">
              <button onClick={()=>setRevealed(true)} className="px-4 py-2 rounded-md bg-indigo-600 text-white font-semibold shadow">Reveal the message</button>
              <button onClick={()=>{setRevealed(false); setAccepted(null)}} className="px-4 py-2 rounded-md border">Reset</button>
            </div>

            <div className="mt-4 text-xs text-gray-500">Tip: Show this page to Aradhya on your phone or laptop at a nice moment — maybe after a friendly badminton game. Be respectful of her feelings — the goal is to make her smile.</div>
          </section>

          <section className="p-4 rounded-xl bg-gradient-to-br from-white to-indigo-50 flex flex-col items-center justify-center">
            {!revealed && (
              <div className="text-center">
                <h3 className="text-lg font-semibold">Ready to ask?</h3>
                <p className="mt-2 text-gray-600">When you press the button, the message will appear. Let your smile do the rest.</p>
                <button onClick={()=>setRevealed(true)} className="mt-4 px-6 py-3 rounded-full bg-pink-500 text-white font-bold">Ask Aradhya</button>
              </div>
            )}

            {revealed && accepted === null && (
              <div className="w-full text-center">
                <div className="inline-block p-6 bg-white rounded-xl shadow-md">
                  <h3 className="text-xl font-bold">{customMsg}</h3>
                  <p className="mt-2 text-sm text-gray-600">— From someone who thinks you're amazing.</p>
                  <div className="mt-4 flex gap-3 justify-center">
                    <button onClick={()=>handleAccept(true)} className="px-4 py-2 rounded-md bg-green-500 text-white font-semibold">Yes 💖</button>
                    <button onClick={()=>handleAccept(false)} className="px-4 py-2 rounded-md bg-red-400 text-white font-semibold">I'm not ready</button>
                  </div>
                </div>

                <div className="mt-3 text-xs text-gray-500">If she chooses "I'm not ready", be kind — thank her for her honesty. Acceptance can't be forced.</div>
              </div>
            )}

            {accepted === true && (
              <div className="w-full text-center py-6">
                <h2 className="text-2xl font-extrabold">She said yes! 🎉</h2>
                <p className="mt-2">Congratulations — start with a happy celebration (and maybe a friendly badminton rematch?)</p>
              </div>
            )}

            {accepted === false && (
              <div className="w-full text-center py-6">
                <h2 className="text-2xl font-extrabold">Thanks for being honest 🌸</h2>
                <p className="mt-2">It takes courage to share your feelings. Give her space, stay kind — there will be more rallies in life.</p>
              </div>
            )}
          </section>
        </main>

        <footer className="mt-6 text-center text-sm text-gray-600">
          <div>Made for <strong>Aradhya</strong> • Badminton theme • Be kind, be respectful.</div>
          <div className="mt-2">Want this as a shareable link or a printable card? Save the page as PDF or host it online.</div>
        </footer>

      </div>

      {/* Small style fallback if Tailwind isn't available */}
      <style>{`
        .min-h-screen{min-height:100vh}
        .shadow-2xl{box-shadow:0 12px 40px rgba(16,24,40,0.12)}
        .rounded-2xl{border-radius:1rem}
        .rounded-xl{border-radius:.75rem}
        .rounded-full{border-radius:9999px}
        .bg-white{background:white}
        .bg-pink-500{background:#ec4899}
        .bg-indigo-600{background:#4f46e5}
        .bg-indigo-50{background:#eef2ff}
        .bg-pink-50{background:#fff1f2}
        .p-6{padding:1.5rem}
        .p-4{padding:1rem}
        .p-3{padding:.75rem}
        .mt-6{margin-top:1.5rem}
        .mt-4{margin-top:1rem}
        .mt-2{margin-top:.5rem}
        .text-sm{font-size:.875rem}
        .text-lg{font-size:1.125rem}
        .text-xl{font-size:1.25rem}
        .text-2xl{font-size:1.5rem}
        .font-bold{font-weight:700}
        .font-extrabold{font-weight:800}
        .text-gray-600{color:#4b5563}
        .text-gray-700{color:#374151}
        .text-indigo-500{color:#6366f1}
        .max-w-3xl{max-width:48rem}
        .w-full{width:100%}
        .grid{display:grid}
        .grid-cols-1{grid-template-columns:1fr}
        @media(min-width:768px){.md\:grid-cols-2{grid-template-columns:1fr 1fr}}
        .gap-6{gap:1.5rem}
        .shadow-inner{box-shadow:inset 0 1px 3px rgba(0,0,0,0.03)}
        .shadow-md{box-shadow:0 6px 18px rgba(0,0,0,0.06)}
        .border{border:1px solid #e5e7eb}
        .rounded-md{border-radius:0.375rem}
        input{outline:none}
      `}</style>
    </div>
  );
}
