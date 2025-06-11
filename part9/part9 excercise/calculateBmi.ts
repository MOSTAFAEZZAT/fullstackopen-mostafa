import { isNotNumber } from "./utils";

export const calculateBmi = (height: number, weight: number): string => {
  isNotNumber(height) && isNotNumber(weight) ?
  console.log("Invalid input") :
   console.log("Height is not a number") 
  switch (true){
    case (weight / (height/100) **2 )   < 16:
      return "Underweight";
    case (weight / (height/100) **2 )   < 18.5:
      return "Moderate thinness";
    case (weight / (height/100) **2 )   < 25:
      return "Normal Range";
    case (weight / (height/100) **2 )   < 30:
      return "Overweight";
    case (weight / (height/100) **2 )   < 35:
      return "Obese class I (Moderate)";
    case (weight / (height/100) **2 )   < 40:
      return "Obese class II (Severe)";
    case (weight / (height/100) **2 )   >= 40:
      return "Obese class III (Very severe or morbid)";
    default:  
      return "Invalid input";

  }
 }

// console.log(calculateBmi(180, 74))