class Issue {

  constructor(title, number, relativeDateCreated, opener, label, score, url) {

    this.title = title;
    this.number = number;
    this.relativeDateCreated = relativeDateCreated;
    this.opener = opener;
    this.label = label;
    this.score = score;
    this.url = url;

  }
}

module.exports = Issue;
