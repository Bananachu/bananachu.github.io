# Présentation du OCaml en MPSI

## Variables et types de base

### Persistance des variables et typage fort
En OCaml les variables sont persistantes, c'est-à-dire qu'une variable définie ne change pas de valeur tout au long du programme. Il est toutefois possible de nommer une nouvelle variable de la même manière qu'une ancienne, laissant cette dernière au ramasse-miettes :
```ocaml
let x = 8;; (* On définit une variable *)
let x = 42;; (* On écrase le "vieux" x *)
```

Cela implique également qu'OCaml ne changera pas de lui même un type de variable comme Python par exemple. Chaque type a ses propres opérateurs dont la syntaxe est distincte et les opérations mixtes ne sont pas possibles *a priori*, typiquement :
```ocaml
let x = 2.71;;
let n = 8;;

let c = x + n;;
(* Erreur : on essaie d'ajouter un entier et un flottant *)
```

### Types de données
#### Les entiers `int`
Propriétés habituelles, la taille mémoire dépend de l'architecture (63 bits pour de l'amd64).
```ocaml
let n = 42;;
```
#### Les flottants `float`
Propriétés habituelles, notons que les opérateurs différent des `int`.
```ocaml
let x = 2.718;; (* float *)
```
#### Les booléens `bool`
Propriétés habituelles.
```ocaml
let A = true;; (* bool *)
```
#### Les caractères `char`
Caractère ASCII vérifiant les propriétés usuelles du C.
```ocaml
let c = 'a';;
```
#### Le type unit `()`
Ce type ne représente pas d'objet à proprement parler, c'est un type vide. C'est par exemple ce qui est renvoyé par la fonction `print_int`. Ce type peut avoir son importance dans des expressions conditionnelles par exemple.
#### Les chaînes de caractères `string`
Les chaînes de caractères sont de longueur arbitrairement grande et indexées.
```ocaml
let mot = "bonjour";; (* string *)
let o = mot.[1];; (* char 'o' *)
```
#### Les listes `list`
> [!WARNING]
> - Tous les éléments de la liste doivent être du même type 
> - Les listes ne sont pas indexées
> - Le type de la liste dépend de son contenu
```ocaml
let l = [1; 2; 3];; (* int list *)
let l = [1.; 2.; 3.];; (* float list *)
let l = ['a'; 'b'; 'c';];; (* char list *)
(* etc.. *)
let l = [];; (* cas particulier : de type "a list" (ou nil) *)
```
#### Expressions conditionnelles
En OCaml, même les expressions `if ... else` ont un type.
> [!WARNING]
> - Toutes les branches doivent renvoyer le même type 
> - Le `else` est nécessaire sauf si le `if` est de type `unit` (la branche `else` est *de facto* `unit` en cas d'absence)
> - Le type de l'expression est celui de ce que renvoient ses branches
```ocaml
let a = if 2 > 1 then 2 else 3;; (* est correcte *)
> val a : int = 2 (* a est alors un entier *)

let a = if 2 > 1 then 5 else 3.14;; (* n'est pas possible *)
```
#### Hors Programme
```ocaml
(* les séquences d'octets *)
(* les arrays [| |] *)
```

### Opérateurs
```ocaml
(* Opérateurs arithmétiques *)
let a = 1 + 2
let a = 1 - 2
let a = 1 * 2
let a = 1 / 2 (* Division euclidienne !*)
let a = 3 mod 2 (* Modulo *)
(* Pour les flottants on rajoute un . *)
let a = 1. +. 2.

(* Opérateurs logiques et booléens *)
(* Notons que le ET et le OU sont tous deux fainéants. *)
let a = true && false
let a = true || false (* "or" possible mais déprécié *)
let a = not false
(* NOTE: not est une fonction *)

(* Opérateurs sur les chaînes de caractères *)
let a = "hello " ^ "world!"

(* Opérateur constructeur de liste *)
let l = 1 :: 2 :: 3 :: [];;
(* Prend une une liste à droite et un élément à mettre dans la liste à gauche. L'élément doit être du bon type (ex "int" pour une "int list") et sera placé en première position. N'importe quoi peut être ajouté dans une 'a list (mais elle devient alors du type du n'importe quoi en question ; par exemple ici l est une int list.*)

(* Concaténateur de liste *)
let l1 = [1; 2; 3];;
let l2 = [4; 5; 6];;
let l = l1 @ l2;;
(* Concatène des listes de même type*)

(* Opérateurs de comparaison *)
(* "Différent de" *)
let f = 42 <> 69;;
(* "Égal à" *)
let g = (42 = 69);;
let h = 42 < 69;;
let i = 
```


## Syntaxe

### Sucre syntaxique
```ocaml
```
### Opérateur `match`

## autres
`String.length` permet d'obtenir la taille d'une `string` (complexité en $\mathscr O(1)$)


## Fonctionnement des listes en OCaml :
même chose qu'en C,
Des couples (éléments, pointeurs) sont répartis de manière un peu random dans la ram.
Les listes sont immuables ; on ne peut pas changer la valeur d'un de ses élément.

list.lenght en O(n)
Dans une boucle for comme une while tout doit être de type unit
