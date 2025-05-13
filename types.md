# Types
> [!IMPORTANT]  
> Ce cours parle des types personnalisés en OCaml. Pour une présentation exhaustive des types de base en OCaml, voir `introduction.md`.

On peut, à la manière des `struct` du C définir des types en OCaml. Il est alors possible de définir des variables de ce type et d'accéder à leurs différents champs avec l'opérateur `.`.


## Types somme (nom officiel : [variant type](https://ocaml.org/docs/basic-data-types#variants))
Un type somme ne peut adopter qu'un nombre prédéfini de valeurs :
```ocaml
let couleur = Rouge | Vert | Bleu;;
```
Une variable du type `couleur` ne peut valoir que `Rouge` ou bien `Vert` ou bien `Bleu` et rien d'autre. On peut donc traiter des variables de ce type à l'aide de `match ... with` comme ici :
```ocaml
let fleur c =
	match c with
	  Bleu -> "bleuet"  (* Remarquer l'absence de |, licite pour le 1er cas *)
	| Rouge -> "coquelicot"
	| Vert -> failwith "t ouf oukoua";; (* pas de fleurs vertes d'après le prof ¯\_(ツ)_/¯ *)
```
> [!TIP]
> Ces types sont ordonnés. On ne s'en sert pas dans notre pratique mais il peut être bon de se rappeler que dans notre exemple : `Rouge > Vert > Bleu`.

### Récursivité
Il est possible de définir des types sommes récursif, c'est-à-dire qu'un de leur champs est du même type qu'eux (et ce champ contient un champ du même type, etc...). Par exemple : 
```ocaml
type stack_of_int = Empty | P of int * stack_of_int;;
(* une pile d'entier peut être vide ou bien un tuple entier, pile d'entier *)
(* On peut visualiser le fonctionnement d'un tel type de la même manière que les listes OCaml *)
let p = Empty;;
let p = let p1 = P(0, Empty) in P(1, p1);;
val p : stack_of_int = P(2, P(1, P(0, Empty)))
```

## Types enregistrement
```ocaml
type pointduplan = {mutable x : float; mutable y : float};;
let p = {x=1.; y=2.};;
Printf.printf "l'abscisse de p est %f\n" p.x;;
```

> Notons qu'ici nos champs sont mutables. Ils ne le sont pas par défaut mais peuvent le devenir avec le mot-clef `mutable` comme utilisé ci-dessus.

Pour continuer notre exemple, on peut donc utiliser ces structures dans des fonctions :
```ocaml
let norm = ??? j'ai perdu cette partie
```
**Remarque :** Les deux champs ne sont pas nécessairement du même type :
```ocaml
type ('a, 'b) tuple = {first:'a; second: 'b};;
let mytuple = {first=5; second="toto"};;
```
`mytuple` est alors du type `int, string tuple`.



## Type option
Dans le cas où nous voulons écrire une fonction qui renvoie une valeur en général mais pas toujours,

## Piles
```ocaml
type 'a internal_stack =
{v : 'a;
mutable next : 'a internal_stack option};;
```
