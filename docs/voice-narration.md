Voice Narration Scripts
Architecture
The app uses the Web Speech API (window.speechSynthesis) for voice narration.
No external dependencies required — works in all modern browsers.
Implementation
Located in: src/hooks/useVoiceNarration.js
Features:
Auto-reads planet facts when clicked
Story narration with pause/resume
Age-appropriate speech rate (0.9x)
Child-friendly female voice preference
Maximum 60 seconds per narration
Narration Scripts
Home Page Welcome
"Welcome to the Solar System Learning Portal! I'm your guide. Click on any planet to start exploring. Let's go on a space adventure!"
Planet Discovery (General)
"You discovered [Planet Name]! [Planet Name] is [description]. Here's a fun fact: [fun fact]. Would you like to hear a story or take a quiz?"
Sun
"This is the Sun! The Sun is a giant ball of hot, glowing gas. It gives us light and warmth every day. Did you know? The Sun is so big that one million Earths could fit inside it! Without the Sun, life on Earth would not exist."
Mercury
"You found Mercury! Mercury is the closest planet to the Sun and also the smallest. It zooms around the Sun faster than any other planet. A year on Mercury is only 88 Earth days! But watch out — Mercury has no atmosphere, so there's no weather at all."
Venus
"Welcome to Venus! Venus is the hottest planet in our Solar System. It spins backwards compared to other planets! Venus is covered in thick pink clouds, and it's sometimes called Earth's twin because they're almost the same size. But Venus is much, much hotter!"
Earth
"This is Earth — our beautiful home! Earth is special because it's the only planet we know that has living things. About 71 percent of Earth is covered by water. Earth has one moon that lights up our night sky. Our atmosphere protects us like a cozy blanket!"
Mars
"You reached Mars, the Red Planet! Mars looks red because of iron rust in its soil. It has two tiny moons named Phobos and Deimos. Scientists have sent robots to explore Mars, and maybe one day, people will live there too! Mars has the tallest mountain in the entire Solar System."
Jupiter
"Wow, you found Jupiter — the biggest planet of all! Jupiter is so huge that all the other planets could fit inside it. It has a giant storm called the Great Red Spot that has been raging for over 300 years. Jupiter has 95 moons! It's like a mini solar system all by itself."
Saturn
"Look at Saturn's beautiful rings! Saturn is famous for its dazzling rings made of ice and rock chunks. Did you know? Saturn is so light that if you had a giant bathtub, Saturn would float! It has 146 known moons. Saturn is the fashionista of the Solar System!"
Uranus
"This is Uranus, the playful oddball! Uranus spins on its side, rolling around the Sun like a ball. Because of this, its seasons last 42 years each! Uranus is an ice giant made of water, ammonia, and methane. It has faint rings that were discovered in 1977."
Neptune
"You made it to Neptune, the farthest planet from the Sun! Neptune is the windiest and coldest planet. Its winds blow faster than 2,000 kilometers per hour! Neptune was discovered by math before anyone saw it through a telescope. It watches over the distant darkness of our Solar System."
Quiz Correct
"Correct! Amazing job, space explorer! You really know your planets!"
Quiz Incorrect
"Not quite, but that's okay! Learning is all about trying. The correct answer is [answer]. Here's why: [explanation]. You'll get it next time!"
Mission Complete
"Mission accomplished! You are a true space explorer! You earned [reward] points!"
Badge Earned
"Congratulations! You earned the [Badge Name] badge! [Badge description]. Keep exploring to earn more badges!"
Solar System Master
"Incredible! You visited all 8 planets and earned the Solar System Master badge! You are now an official guardian of the galaxy! Your parents must be so proud!"
Usage in Code
JavaScript
import { useVoiceNarration } from '../hooks/useVoiceNarration.js'

function PlanetCard({ planet }) {
  const { speak, stop, isSpeaking } = useVoiceNarration()

  return (
    <button onClick={() => speak(planet.story)}>
      {isSpeaking ? '🔊 Stop' : '🔊 Read Story'}
    </button>
  )
}
