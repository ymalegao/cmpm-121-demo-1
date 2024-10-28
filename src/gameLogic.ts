export interface Item {
    name: string;
    cost: number;
    rate: number;
    description: string;
  }
  
  export class Game {
    crowns: number = 0;
    lastTime: number = 0;
    growthRate: number = 0;
    crownsEarnedAccumulator: number = 0;
    upgradeCostMultiplier: number = 1.15;
    availableItems: Item[];
  
    constructor() {
      this.availableItems = [
        { name: "Serf Workforce", cost: 10, rate: 0.1, description: "Serfs enjoy protection without land." },
        { name: "Knights of the Square Table", cost: 100, rate: 2, description: "Not as good as the Roundtable." },
        { name: "Plebeian", cost: 500, rate: 5, description: "One Roman is worth 50 serfs." },
        { name: "Singing Bard", cost: 1000, rate: 50, description: "Will sing for crowns." },
        { name: "Playful Jester", cost: 2000, rate: 100, description: "They get to make fun of royalty." },
      ];
    }

   
  
    updateGrowthRate(item: Item) {
      this.growthRate += item.rate;
    }
  
    processCrowns(deltaTime: number) {
      const increment = deltaTime * this.growthRate;
      this.crowns += increment;
      this.crownsEarnedAccumulator += this.growthRate * deltaTime;
    }
  
    canPurchase(itemCost: number): boolean {
      return this.crowns >= itemCost;
    }
    
    purchaseItem(item: Item) {
      if (this.canPurchase(item.cost)) {
        this.crowns -= item.cost;
        this.updateGrowthRate(item);
        item.cost *= this.upgradeCostMultiplier;
      }
    }
  }