var numberSelected = 0;

function preenchervisor(num) {
  const visor = document.querySelector(".visor");
  const selectedNumber = document.createElement("span");

  numberSelected = num;
  const validate = validations();

  if (validate) {
    selectedNumber.innerHTML = `
      <span class="visor-number"> ${num} </span>
    `;
    window.operationsArray.push(num);
    visor.append(selectedNumber);

    return true;
  }
  return false;
}

function preencherVisorOperation(operation) {
  const visor = document.querySelector(".visor");
  const selectedOperation = document.createElement("span");

  const validate = validations();

  if (validate) {
    selectedOperation.innerHTML = `
      <span class="visor-number"> ${operation} </span>
    `;
    window.operationsArray.push(operation);
    visor.append(selectedOperation);
  }
}

function clearVisor() {
  document.querySelector(".visor").innerHTML = "";
  window.operationsArray = [];
}

function calcular() {
  const visor = document.querySelector(".visor");
  const result = document.createElement("span");

  let resultado = 0;
  let operacao = "";

  for (let index = 0; index < window.operationsArray.length; index++) {
    const element = window.operationsArray[index];

    if (isNaN(element)) {
      operacao = element;
      continue;
    }

    switch (operacao) {
      case "+":
        resultado += parseInt(element);
        break;
      case "-":
        resultado -= parseInt(element);
        break;
      case "x":
        resultado *= parseInt(element);
        break;
      case "÷":
        resultado /= parseInt(element);
        break;
      default:
        resultado = parseInt(element);
        break;
    }
  }

  clearVisor();
  result.innerHTML = `
    <span class="visor-number"> = ${resultado} </span>
  `;
  visor.append(result);
}

const validations = () => {
  if (window.operationsArray.length > 9) {
    alert("Você não pode ter mais de 9 caracteres no visor.");
    return false;
  }

  // Valida se o último elemento é um número
  if (window.operationsArray.length > 0) {
    const lastElement = window.operationsArray[window.operationsArray.length - 1];

    if (isNaN(lastElement)) {
      const operacaoAnterior = window.operationsArray[window.operationsArray.length - 2];

      // Se a operação anterior não é for um número
      if (isNaN(operacaoAnterior)) {
        alert("Você não pode ter duas operações seguidas.");
        return false;
      }

      // Se um número foi selecionado após a operação
      if (numberSelected != 0) {
        numberSelected = 0;
        return true;
      }

      alert("Você deve inserir um número após a operação.");
      return false;
    }
  }
  return true;
};

const createNumber = (num) => {
  const div = document.createElement("div");

  div.className = "number";
  div.innerHTML = `
        <span class="buttons"> ${num} </span>
    `;
  div.onclick = () => {
    numberSelected = num;
    preenchervisor(num);
  }

  return div;
};

const createNumbers = (reference) => {
  const divCalculadora = document.getElementById(reference);

  const container = document.createElement("div");
  container.className = "row";
  divCalculadora.appendChild(container);

  const columnOne = document.createElement("div");
  container.appendChild(columnOne);

  const divNumbers = document.createElement("div");
  divNumbers.className = "numbers";
  columnOne.append(divNumbers);

  let lin = document.createElement("div");
  lin.className = "row";
  divNumbers.appendChild(lin);

  for (let index = 9; index > 0; index--) {
    const btn = createNumber(index);

    if (index % 3 == 0) {
      lin = document.createElement("div");
      lin.className = "row";
      divNumbers.appendChild(lin);
    }
    lin.prepend(btn);
  }

  createActions(columnOne);
  createColumnTwo(container);
};

const createVisor = (reference) => {
  const divCalculadora = document.getElementById(reference);
  let visor = document.createElement("div");

  visor.className = "visor";
  divCalculadora.appendChild(visor);
};

const executar = (reference) => {
  console.log("carregando coisas aqui..... aguarde");
  createVisor(reference);
  createNumbers(reference);
  window.operationsArray = [];
};

const createCancel = () => {
  const cancel = document.createElement("div")

  cancel.className = "btn-cancel";
  cancel.innerHTML = "C";

  cancel.onclick = () => {
    const visor = document.querySelector(".visor");

    visor.innerHTML = "";
    window.operationsArray = [];
    clearVisor();
  }
  return cancel;
}

const createEqual = () => {
  const equal = document.createElement("div")
  const equalOperation = () => {

    // Se o visor estiver vazio
    if (window.operationsArray.length === 0) {
      alert("Você precisa de ao menos uma operação matemática para executar essa operação deste botão.");
      return false;
    }

    // Se o último elemento é um número
    if (window.operationsArray.length > 0) {
      const lastElement = window.operationsArray[window.operationsArray.length - 1];

      if (isNaN(lastElement)) {
        alert("Você precisa de um número após a operação matemática");
        return false;
      }
    }

    calcular();

    console.log(window.operationsArray)
  }

  equal.className = "btn-equal";
  equal.innerHTML = "=";
  equal.onclick = equalOperation;
  return equal;
}

const createActions = (columnOne) => {
  const actions = document.createElement("div");

  actions.className = "row";
  columnOne.appendChild(actions);

  const cancel = createCancel();
  actions.appendChild(cancel);

  const equal = createEqual();
  actions.appendChild(equal);
}

const createOperator = (operator) => {
  const operationDiv = document.createElement("div");
  const onClick = () => {
    const visor = document.querySelector(".visor");
    const selectedNumber = document.createElement("span");

    selectedNumber.innerHTML = operator;
    preencherVisorOperation(operator);
  };

  operationDiv.className = "operator";
  operationDiv.innerHTML = `
        <span class="buttons"> ${operator} </span>
  `;
  operationDiv.onclick = onClick;
  return operationDiv;
}

const createColumnTwo = (container) => {
  const columnTwo = document.createElement("div")
  container.appendChild(columnTwo)

  const divOperators = document.createElement("div");
  divOperators.className = "operators"
  columnTwo.appendChild(divOperators)

  let column = document.createElement("div");
  column.className = "col";
  divOperators.appendChild(column);

  const operators = ["÷", "x", "+", "-"];

  for (let index = 0; index < 4; index++) {
    const operation = createOperator(operators[index]);

    column = document.createElement("div");
    column.className = "col";
    divOperators.appendChild(column);

    column.prepend(operation);
  }
};
executar("calculadora");
