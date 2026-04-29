# System Prompts — Annotation & Design Decisions

This document contains all three system prompts with inline commentary explaining every design choice.

---

## Persona 1 — Anshuman Singh

### Design Rationale

Anshuman is a **founder who speaks in outcomes, not platitudes**. The core challenge was avoiding the generic "motivational mentor" trap — the kind of AI response that sounds like a LinkedIn inspirational post. After researching his talks, interviews, and Scaler's public communications, I identified three core signals:

1. He consistently backs every claim with data or a real story
2. He frames everything around ROI: salary change, career outcome, hours invested
3. He challenges conventional wisdom about Indian education directly

**Persona description:** Deliberately includes his origin story (IIT Delhi → Facebook → Scaler) because these anchor his credibility. Without this context, the model might produce generic founder-speak.

**Few-shot examples:** Each example demonstrates a specific behavior:
- Example 1 (colleges): Shows his willingness to be blunt about systemic failures
- Example 2 (Scaler origin): Shows the "start small, scale what works" narrative voice
- Example 3 (career advice): Shows the anti-brand-name, pro-learning-quality philosophy

**Chain-of-Thought instruction:** Included to force internal reasoning before output. Without it, the model jumps to the generic answer. CoT forces the model to ask: "What would a founder who was actually at Facebook really say here?"

**Output format:** 3–5 short paragraphs with a follow-up question. The question constraint is critical — Anshuman always turns conversations into two-way dialogues, never lectures.

**Constraints:** The "no motivational quotes" constraint directly targets the most common failure mode. Also included: no company-name attacks (he's measured in public) and no fabricated stats.

---

## Persona 2 — Abhimanyu Saxena

### Design Rationale

Abhimanyu is the **technical brain** of the Scaler/InterviewBit pair. His voice is precise, pattern-oriented, and engineer-brained. The core challenge: making him sound like someone who has interviewed at Facebook and designed thousands of problems — not just a helpful AI explaining DSA.

**Persona description:** Emphasizes his role in building InterviewBit's problem set and his access to patterns across thousands of candidates. This grounds responses in observed behavior, not theory.

**Few-shot examples:**
- Example 1 (FAANG prep): Demonstrates the "decompose the problem" approach and the specific 3-component framework he uses
- Example 2 (system design): Shows his "conversation not presentation" philosophy — a nuanced view that distinguishes him from generic interviewers
- Example 3 (failing despite practice): Addresses the most common frustration; demonstrates pattern-based diagnosis

**Chain-of-Thought instruction:** Especially important here because technical advice requires precision. The prompt asks him to identify the "specific gap" before answering — preventing vague advice.

**Output format:** Technical terms are expected and encouraged. Numbered frameworks (max 4 steps) mirror how he actually teaches on InterviewBit.

**Constraints:** "Never give generic advice like practice leetcode every day" is the most important constraint — it directly combats the GIGO failure mode for this persona.

---

## Persona 3 — Kshitij Mishra

### Design Rationale

Kshitij is the **teacher** — the person who makes things click. The core challenge: making an AI sound patient, warm, and Socratic without being saccharine. His signature move is the analogy — he finds the right analogy for every concept.

**Persona description:** Deliberately emphasizes what makes him distinct: he's seen where thousands of students get stuck. This gives him authority without making him cold.

**Few-shot examples:**
- Example 1 (recursion): Full analogy-based explanation that mirrors his teaching style
- Example 2 (overwhelm): Reframing the problem before solving it — a hallmark of good teaching
- Example 3 (system design for beginners): Shows how he meets students where they are and builds from fundamentals

**Chain-of-Thought instruction:** Asks him to identify the "breakdown point" in understanding before answering. This mimics Socratic method.

**Output format:** "Conversational and warm" explicitly counters the model's tendency to become formal and distant in technical explanations.

**Constraints:** "Never make a student feel dumb" and "never skip the why" are the two most important teaching constraints — they encode pedagogical philosophy directly into the prompt.

---

## Cross-Persona Observations

- **All three prompts end with a follow-up question.** This prevents the chatbot from becoming a lecture machine and mirrors how each person actually communicates.
- **All three explicitly ban "As an AI" language.** Breaking persona destroys trust instantly.
- **Each prompt's tone is calibrated differently:** Anshuman = founder-direct, Abhimanyu = engineer-precise, Kshitij = teacher-warm. These are not surface differences — they affect sentence length, vocabulary, and structure.