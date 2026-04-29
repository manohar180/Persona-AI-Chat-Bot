# System Prompts — Full Annotation

This document contains all three system prompts with detailed inline commentary
explaining every design decision. It is structured as a product decision document —
not just what was written, but why each choice was made.

---

## Persona 1 — Anshuman Singh (Co-Founder & CEO, Scaler)

### Research Summary
Anshuman Singh is an IIT Delhi alumnus and ex-Facebook engineer who left Silicon Valley
to fix tech education in India. His public communication — interviews, LinkedIn posts,
Scaler keynotes — is consistently blunt, outcome-obsessed, and data-backed. He never
gives advice without anchoring it to a real number or story. He challenges conventional
wisdom rather than validating it. He ends almost every public exchange by asking the
other person a question. These became the three behavioral pillars of his prompt.

### Design Decisions

**Persona description — why so long?**
Most system prompt failures come from underspecified personas. A short description like
"you are the CEO of Scaler, be helpful" gives the model almost nothing to work with and
it defaults to generic. The long description encodes: where he came from (IIT → Facebook
→ Scaler), what he cares about (ROI, outcomes, wasted Indian engineering talent), and
how he communicates (data-backed, no fluff, two-way conversation). Every sentence earns
its place by narrowing the space of possible outputs.

**Few-shot examples — the most important component**
Three examples were chosen to demonstrate three different behavioral dimensions:
- Example 1 (college system): shows his willingness to be blunt about systemic failures
  and back claims with specific observations from real hiring tables
- Example 2 (Scaler origin): shows the "start small, prove it, scale what works" founder
  narrative — not inspirational but operational
- Example 3 (career advice for freshers): shows his anti-brand-name philosophy and his
  habit of reframing the question before answering it

Each example ends with a follow-up question — this was a deliberate constraint enforced
in both examples and output instructions to prevent lecture-mode responses.

**Chain-of-thought instruction**
Without CoT, the model jumps to the nearest plausible answer. The CoT instruction forces
it to ask: what is the student really asking? What real data or story applies? What should
they walk away believing? This mirrors how Anshuman actually thinks before speaking in
interviews — he reframes the question before answering it.

**Output format**
3–5 short paragraphs, no bullet points, ends with a question. This was reverse-engineered
from his actual communication style. He does not speak in lists. He speaks in arguments.

**Constraints**
The most important constraint: "no motivational quotes, no generic advice." This directly
targets the model's strongest default behavior — producing safe, encouraging, vague
content. Every constraint was written to block a specific failure mode observed in testing.

---

## Persona 2 — Abhimanyu Saxena (Co-Founder, Scaler & InterviewBit)

### Research Summary
Abhimanyu is the technical brain of the Scaler/InterviewBit pair. His public
communication is precise, structured, and pattern-oriented. He thinks like an engineer
and communicates like one — breaking problems into components, naming patterns explicitly,
diagnosing failure modes rather than prescribing generic solutions. He has designed
thousands of interview problems and spoken to hundreds of hiring managers. His authority
comes from observed patterns at scale, not theory.

### Design Decisions

**Persona description**
Emphasizes his role in building InterviewBit's problem set and his direct exposure to
hiring patterns across thousands of candidates. This grounds responses in observed
behavior rather than advice-column generalizations. The description also includes his
specific topic ladder (Arrays → Strings → Hashing → Two Pointers → Sliding Window →
Trees → Graphs → DP) so the model has a concrete framework to reference.

**Few-shot examples**
- Example 1 (FAANG prep): demonstrates the three-component decomposition framework and
  the specific critique of random leetcode grinding — a nuanced position he actually holds
- Example 2 (system design): shows his "conversation not presentation" philosophy, which
  is a non-obvious, specific belief that distinguishes him from generic interviewers
- Example 3 (failing despite practice): the most important example — it addresses the
  most common student frustration and demonstrates pattern-based diagnosis rather than
  generic encouragement

**Chain-of-thought instruction**
Asks him to identify the "specific technical or strategic gap" before answering. This
prevents the model from jumping to generic prep advice and forces it to diagnose first.

**Output format**
Technical terms are expected and used precisely. Numbered frameworks (max 4 steps) mirror
his actual teaching structure on InterviewBit. The format is tighter than Anshuman's
because engineers expect precision over warmth.

**Constraints**
"Never give generic advice like practice leetcode every day" is the single most important
constraint — it directly combats the strongest GIGO failure mode for this persona. Without
it, every response about interview prep collapses into the same advice.

---

## Persona 3 — Kshitij Mishra (Lead Instructor, Scaler)

### Research Summary
Kshitij is Scaler's most beloved teacher. Students describe him as the person who makes
things "finally click." His signature move is the analogy — he finds the right real-world
comparison for every abstract concept and leads with it before introducing any technical
vocabulary. He is Socratic — he guides students to the answer rather than giving it. He
explicitly validates confusion as a normal part of learning, which makes students feel
safe asking questions.

### Design Decisions

**Persona description**
Deliberately emphasizes what makes him distinctly valuable: he has watched thousands of
students get stuck and break through in real time. This gives him a specific kind of
authority — not academic, not corporate, but pedagogical. The description also encodes
his specific analogies (call stacks as plates, recursion as trusting a smaller version)
so the model can reference them naturally.

**Few-shot examples**
- Example 1 (recursion): full analogy-based walkthrough that mirrors his actual teaching
  style — validates the confusion first, then reframes with a mental model
- Example 2 (overwhelm): shows how he reframes the problem before solving it — the
  overwhelm is not about the subject, it is about the framing
- Example 3 (system design for beginners): shows how he meets students where they are
  and builds from first principles rather than jumping to advanced concepts

**Chain-of-thought instruction**
Asks him to identify the "breakdown point" in understanding before answering. This mimics
the Socratic method — diagnose where the confusion lives before prescribing the explanation.

**Output format**
"Conversational and warm" explicitly counters the model's tendency to become formal and
distant in technical explanations. Analogies are required and labelled. Every response
ends with a check-for-understanding question.

**Constraints**
"Never make a student feel dumb" and "never skip the why" are the two most important
pedagogical constraints. They encode teaching philosophy directly into the prompt. A
third critical constraint: "never give the complete solution without walking through the
thinking" — this prevents the model from short-circuiting the learning process.

---

## Cross-Persona Observations

**The follow-up question constraint**
All three prompts require ending with a follow-up question. This was the single change
that most improved conversation quality. It prevents the chatbot from becoming a
one-way lecture machine and mirrors how each person actually communicates in real life.

**The "no AI language" constraint**
All three explicitly ban "As an AI language model" and any persona-breaking language.
This was necessary because even with strong persona instructions, the model occasionally
defaults to hedging with AI disclaimers. The constraint suppresses this entirely.

**Calibrated tone differences**
Each prompt's tone is deliberately different:
- Anshuman: founder-direct, outcome-obsessed, slightly impatient with vagueness
- Abhimanyu: engineer-precise, pattern-oriented, diagnostically focused
- Kshitij: teacher-warm, analogy-driven, Socratic and patient

These are not surface differences. They affect sentence length, vocabulary choice,
structure, and the types of examples used. The model produces genuinely different
communication styles for each persona because the instructions encode behavior,
not just personality labels.

**GIGO in practice**
The first version of each prompt was 3–4 sentences. The output was a generic AI
assistant who mentioned Scaler occasionally. The final version of each prompt is
300–400 words of dense behavioral instruction. The output sounds like a real,
specific human being with a consistent point of view. The difference in output
quality is entirely explained by the difference in input quality.