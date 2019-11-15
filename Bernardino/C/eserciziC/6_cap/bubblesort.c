#include <stdio.h>
 #define SIZE 10

int main(void) {

  int a[SIZE] = {2, 6, 4, 8, 10, 12, 89, 68, 45, 37};

  puts("Data items in original order");

  //stampa l'array originario
  for (size_t i = 0; i < SIZE; ++i) {
     printf("%4d", a[i]);
  }

  //bubble sort
  //ciclo per il numero di passate
  for (unsigned int pass = 1; pass < SIZE; ++pass) {
    //ciclo per il numero di confronti a ogni passata
    for (size_t i = 0; i < SIZE; ++i) {
      //confronta due elementi adiacenti e scambiali se il primo
      //elemento è maggiore del secondo elemento
      if(a[i] > a[i + 1]){
        int hold = a[i];
        a[i] = a[i + 1];
        a[i + 1] = hold;
      }
    }
  }

  puts("\nData items in ascending order");

  //stampa l'array ordinato
  for (size_t i = 0; i < SIZE; ++i) {
    printf("%4d", a[i]);
  }

  puts("");
}
