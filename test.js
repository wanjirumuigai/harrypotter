class Children {
    constructor(name,grade, age) {
      this.name = name 
  this.grade = grade
  this.age = age
  this.favFood = []
  
    }
    introduce() {
        return `Hi my name is ${this.name}`
    }
    addFood (food) {
        this.favFood.push(food)
    }
    iterateFood() {
        this.favFood.forEach(this.loopFood)
        
    }
    loopFood = (food) => {
        console.log(`Hi, my name is ${this.name} and I love ${food}`)
    }
  } 
  let jason = new Children('Jason',3,8) 
jason.addFood('chapati')
jason.addFood('meat')
jason.addFood('rice')
jason.iterateFood()
