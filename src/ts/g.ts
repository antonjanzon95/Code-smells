/*
  1. Se om du kan hitta två stycken code smells i följande funktion och rätta till dem.
  Funktionen tar emot en lista med längshoppslängder och syftet med funktionen är att summera
  dessa hopplängder.
  */

function getTotalLength(jumpLengths: number[]): number {
  return jumpLengths.reduce(
    (jumpDistanceSoFar, currentJump) => jumpDistanceSoFar + currentJump
  );
}

/*
  2. I detta exempel har vi fokuserat på if-statements. Se om du kan göra exemplet bättre!
  */

class Student {
  constructor(
    public name: string,
    public handedInOnTime: boolean,
    public passed: boolean
  ) {}
}

function getStudentStatus(student: Student): string {
  if (student.name === "Sebastian" && student.handedInOnTime) {
    return "VG";
  }
  return "IG";
}

/*
  3. Variabelnamn är viktiga. Kika igenom följande kod och gör om och rätt.
  Det finns flera code smells att identifiera här. Vissa är lurigare än andra.
  */

class TempReading {
  constructor(
    public location: string,
    public dateToday: Date,
    public temperature: number
  ) {}
}

function averageWeeklyTemperature(temperatures: TempReading[]): number {
  const daysInAWeek: number = 7;
  const millisecondsInAWeek: number = 604800000;

  return (
    temperatures.reduce((previousValue: number, currentValue: TempReading) => {
      if (
        currentValue.location === "Stockholm" &&
        currentValue.dateToday.getTime() > Date.now() - millisecondsInAWeek
      ) {
        return previousValue + currentValue.temperature;
      }
      return previousValue;
    }, 0) / daysInAWeek
  );
}

/*
  4. Följande funktion kommer att presentera ett objekt i dom:en. 
  Se om du kan göra det bättre. Inte bara presentationen räknas, även strukturer.
  */

interface Products {
  name: string;
  price: number;
  amount?: number;
  description?: string;
  image: string;
  parent: HTMLElement;
}

function showProduct(products: Products) {
  let container = document.createElement("div");
  let title = createTitleNode(products.name);
  let price = createPriceNode(products.price);
  let image = createImgNode(products.image);

  container.appendChild(title);
  container.appendChild(price);
  container.appendChild(image);
  products.parent.appendChild(container);
}

function createTitleNode(name: string): HTMLHeadingElement {
  let productHeading = document.createElement("h4") as HTMLHeadingElement;
  productHeading.innerHTML = name;

  return productHeading;
}

function createPriceNode(price: number) {
  let productPrice = document.createElement("strong") as HTMLElement;
  productPrice.innerHTML = price.toString();

  return productPrice;
}

function createImgNode(imageSrc: string) {
  let productImg = document.createElement("img") as HTMLImageElement;
  productImg.src = imageSrc;

  return productImg;
}

/*
  5. Följande funktion kommer presentera studenter. Men det finns ett antal saker som 
  går att göra betydligt bättre. Gör om så många som du kan hitta!
  */

function presentStudents(students: Student[]) {
  for (const student of students) {
    let container = document.createElement("div");

    let checkbox = createCheckbox(student.handedInOnTime);

    container.appendChild(checkbox);

    let listOfStudents = student.handedInOnTime
      ? document.querySelector("ul#passedstudents")
      : document.querySelector("ul#failedstudents");

    listOfStudents?.appendChild(container);
  }
}

function createCheckbox(checked: boolean) {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = checked;

  return checkbox;
}

/*
  6. Skriv en funktion som skall slå ihop följande texter på ett bra sätt:
  Lorem, ipsum, dolor, sit, amet
  Exemplet under löser problemet, men inte speciellt bra. Hur kan man göra istället?
  */

function concatenateStrings(): string {
  const loremTexts: string[] = ["Lorem", "ipsum", "dolor", "sit", "amet"];
  return loremTexts.join("");
}

/* 
7. Denna funktion skall kontrollera att en användare är över 20 år och göra någonting.
    Det finns dock problem med denna typ av funktion. Vad händer när kraven ändras och
    fler och fler parametrar behöver läggas till? T.ex. avatar eller adress. Hitta en bättre
    lösning som är hållbar och skalar bättre. 
*/

interface User {
  name: string;
  birthday: Date;
  email: string;
  password: string;
  address?: string;
  avatar?: string;
}

function createUser(user: User) {
  const minAge = 20;
  const unixStart = 1970;

  // Validation
  let ageDiffInMilliseconds = Date.now() - user.birthday.getTime();
  let ageInDate = new Date(ageDiffInMilliseconds);
  let userAge = Math.abs(ageInDate.getUTCFullYear() - unixStart);

  if (userAge > minAge) {
    // Logik för att skapa en användare
  } else {
    return "Du är under 20 år";
  }
}
