
class TextAnimator {
  constructor(text, animationPattern = ['\\', '|', '/', '—']) {
    this.text = text;
    this.animationPattern = animationPattern;
    this.patternLength = this.animationPattern.length;
    //in ms
    this.animationSpeed = 500;
  }

  getInitialText() {
    return this.text;
  }

  feedNode(node) {
    this.targetNode = node;
    this.animationNode = document.createElement('span');
    this.animationNode.classList.add('terminal-animationNode');
    this.targetNode.appendChild(this.animationNode);

    this._startAnimation();
  }

  _startAnimation() {
    this.currentIndex = 0;
    this._updateTheAnimation();
    this.animationID = setInterval(this._updateTheAnimation.bind(this), this.animationSpeed);
  }

  _updateTheAnimation() {
    this.animationNode.innerHTML = this.animationPattern[this.currentIndex];
    this.currentIndex++;
    if (this.currentIndex >= this.patternLength) {
      this.currentIndex = 0;
    }
  }

  stopAnimation() {
    clearInterval(this.animationID);
    this.animationNode.innerHTML = '.';
    this.animationNode.classList.remove('terminal-animationNode');
  }


}

export default TextAnimator;