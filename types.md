# Types

## Types enregistrement
On peut, à la manière des `struct` du C définir des types en OCaml. On peut alors créer des variables de ce type et accéder à leurs différents champs avec le `.` :
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

## Types somme
Un élément de type `couleur` ne peux avoir que trois valeurs différentes. On peut alors le manipuler dans une fonction avec un `match ... with` :
```ocaml
let couleur = Rouge | Vert | Bleu;;
let fleur c =
	match c with
	  Bleu -> "bleuet"  (* Remarquer l'absence de |, licite pour le 1er cas *)
	| Rouge -> "coquelicot"
	| Vert -> failwith "t ouf oukoua";;
```
arité
```ocaml
type stack_of_int = Empty | P of int * stack_of_int;;
let p = Empty;;
let p = let p1 = P(0, Empty) in P(1, p1);;
val p : stack_of_int = P(2, P(1, P(0, Empty)))
```

## Type option
Dans le cas où nous voulons écrire une fonction qui renvoie une valeur en général mais pas toujours,

## Piles
```ocaml
type 'a internal_stack =
{v : 'a;
mutable next : 'a internal_stack option};;
```
