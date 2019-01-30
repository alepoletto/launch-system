class MemoryStorage {
  constructor(capacity) {
    this.cache = [];
    this.currentCapacity = 0;
    this.maxCapacity = capacity || 100;
  }

  getMaxCapacity() {
    return this.maxCapacity;
  }

  getCurrentCapacity() {
    return this.currentCapacity;
  }

  add(launch) {
    if (this.currentCapacity > this.maxCapacity) {
      return;
    }
    this.currentCapacity++;
    this.cache.push(launch);
  }

  get(start = 0, end = 6) {
    if (!this.cache.length) {
      return null;
    }
    return this.cache.slice(start, end);
  }
}

module.exports = MemoryStorage;
