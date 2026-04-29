# Reflection — Persona-Based AI Chatbot

## What Worked

The single most effective technique in this assignment was replacing descriptive adjectives
with concrete behavioral instructions. My first drafts said things like "you are direct and
data-driven" or "you are warm and patient." These produced outputs that were
indistinguishable from a generic helpful AI assistant who happened to mention Scaler
occasionally. The breakthrough came when I rewrote every instruction as a specific,
observable behavior.

For Anshuman, instead of "be data-driven," I wrote: "back every claim with a number, a
story, or a real example from Scaler's journey." For Kshitij, instead of "be warm," I
wrote: "acknowledge confusion as valid before explaining — say things like 'this trips up
almost everyone the first time.'" These changes produced dramatically different outputs
because I was no longer describing a personality — I was scripting behaviors.

The few-shot examples were the highest-leverage investment in the entire assignment. Once
I wrote three strong, authentic example exchanges per persona — exchanges that genuinely
sounded like the real person — the model's baseline behavior shifted. The examples did
something instruction text alone could not: they showed the model what "right" looked like
in practice. Anshuman's examples were blunt and outcome-focused. Abhimanyu's were
technical and pattern-oriented. Kshitij's were analogy-driven and Socratic. Each set of
examples established a tone that carried through the entire conversation.

The chain-of-thought instruction also made a measurable difference. Asking the model to
internally reason through "what is this person actually asking beneath the surface?" before
responding reduced surface-level answers significantly. The model started addressing the
real question, not just the stated one.

## What the GIGO Principle Taught Me

GIGO — Garbage In, Garbage Out — was viscerally real in this assignment. My initial
Anshuman prompt was four sentences: name, company, background, "be helpful and direct."
The output was a generic AI assistant who name-dropped Scaler. It had none of Anshuman's
specific conviction about India's broken education system, none of his founder urgency,
none of his habit of turning every answer into a two-way conversation with a follow-up
question.

The principle taught me that the model is not generating a persona from scratch — it is
executing instructions. If the instructions are vague, the model fills the gaps with the
statistical average of everything it has been trained on, which is generic, bland, and safe.
The more specific and behavioral the instructions, the less room there is for generic
defaults to appear.

The most concrete GIGO lesson was that constraints mattered as much as instructions.
Telling the model what NOT to do — no motivational quotes, no generic advice like "work
hard," no "great question!", no breaking character — prevented the exact failure modes
that made early outputs feel hollow and fake. Negative constraints are not restrictions on
the model's creativity. They are guardrails that force creativity in the right direction.

I also learned that the order of instructions matters. Putting the persona description
before the few-shot examples, and the few-shot examples before the output format
instructions, produced better results than mixing them. The model needs context before
it can use examples, and examples before it can internalize format.

## What I Would Improve

**Deeper research:** The weakest part of my prompts is that I had to infer tone from
public interviews, LinkedIn posts, and Scaler's content rather than direct transcripts of
how each person speaks in casual, unscripted conversation. With access to actual class
recordings, WhatsApp voice notes, or internal Scaler talks, I could have written few-shot
examples that were far more phonetically and tonally accurate.

**Dynamic context injection:** Right now the system prompt is entirely static. In a
production version, I would maintain a lightweight user profile object — year of study,
current company, target company, tech stack — and inject relevant context into each API
call. A student at IIT Bombay targeting Google should get a different response from
Anshuman than a working professional at a service company targeting a startup. The persona
stays the same; the context shifts.

**Evaluation loop:** I wrote prompts, tested them manually, and revised by feel. A
rigorous improvement loop would define explicit evaluation criteria — does the response
end with a question? does it avoid generic advice? does it reference something real and
specific? — and score 20–30 test responses systematically before finalizing each prompt.
This is how prompt engineering works in professional settings and it would have caught
several failure modes I only noticed late.

**Retrieval augmentation:** The biggest fundamental limitation is that the personas can
only reference information from the model's training data. Real-time retrieval of recent
Scaler blog posts, LinkedIn updates, or course announcements would allow personas to
speak about current events in their own voice — dramatically increasing authenticity and
making the chatbot genuinely useful for current students, not just impressive in a demo.