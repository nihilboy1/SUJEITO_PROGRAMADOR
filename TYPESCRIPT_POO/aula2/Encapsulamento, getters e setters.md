Encapsulamento é um conceito importante na programação orientada a objetos (POO) que envolve a ocultação dos detalhes internos de uma classe, restringindo o acesso direto aos atributos e métodos da classe. O encapsulamento visa proteger o estado interno da classe e garantir que a interação com os objetos seja feita através de uma interface controlada.

Em TypeScript, o encapsulamento é alcançado usando modificadores de acesso, que são palavras-chave que determinam a visibilidade dos membros de uma classe. Existem três modificadores de acesso disponíveis:

1. `public`: O modificador `public` indica que um membro (atributo ou método) é acessível a partir de qualquer lugar do código, tanto dentro da classe em que está declarado quanto por instâncias dessa classe. Esse é o modificador de acesso padrão em TypeScript, ou seja, se nenhum modificador for especificado, o membro será tratado como `public`.

2. `private`: O modificador `private` indica que um membro só pode ser acessado e modificado dentro da própria classe em que está declarado. Isso significa que o membro não é visível nem acessível por instâncias da classe ou por outras classes. O uso do `private` ajuda a proteger os detalhes internos e o estado da classe.

3. `protected`: O modificador `protected` permite que um membro seja acessado e modificado dentro da própria classe em que está declarado e também em classes derivadas (subclasses) que herdam da classe. Isso significa que o membro não é acessível por instâncias da classe ou por outras classes que não sejam subclasses diretas. O `protected` é útil quando você deseja que um membro seja visível apenas para a própria classe e suas subclasses.

Aqui está um exemplo de encapsulamento em TypeScript:

```typescript
class BankAccount {
  private balance: number;

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }
  // Isso é um setter
  public deposit(amount: number): void {
    this.balance += amount;
  }

  // Isso é um setter
  public withdraw(amount: number): void {
    if (amount <= this.balance) {
      this.balance -= amount;
    } else {
      console.log("Insufficient funds.");
    }
  }
  // Isso é um getter
  public getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance()); // 1300
account.balance = 5000; // Erro: 'balance' é privado e não pode ser acessado externamente
```

Neste exemplo, a classe `BankAccount` tem um atributo `balance` declarado como `private`, que armazena o saldo da conta. Os métodos `deposit()`, `withdraw()`, e `getBalance()` são declarados como `public` para permitir a interação com o saldo da conta de forma controlada. O acesso direto ao atributo `balance` fora da classe é impedido devido à sua declaração como `private`, garantindo que o saldo só possa ser modificado por meio dos métodos apropriados.

O encapsulamento é fundamental para manter a integridade dos objetos e evitar que os dados sejam corrompidos ou acessados indevidamente. Ao encapsular adequadamente os atributos e fornecer uma interface pública bem definida, você pode controlar como os objetos interagem, garantindo a consistência e segurança do código.
