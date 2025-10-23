---
layout: default
title: Tableaux en OCaml
---

# Tableaux en OCaml

## Fonctionnement interne
Contrairement aux listes où chaque élément est un couple (valeur, pointeur), ici tous les éléments sont contigus dans la mémoire. Notons que chaque élément est de taille 64bits. De fait, tous les éléments du tableau sont de même type et sa taille est fixée, il est toutefois possible de changer le contenu de telle ou telle case, tant qu'il reste du même type.

Représentation imagée d'un tableau OCaml (on voit que les éléments sont contigus)
Adresse : notons x la taille d'un élément et &t l'adresse du tableau
| &t + x | &t + 2x | &t + 3x | &t + 4x | … |
|:-------|:--------|:--------|:--------|---:|
| `tab.(0)` | `tab.(1)` | `tab.(2)` | `tab.(3)` | … |



## Syntaxe
```ocaml
let tab = [|1; 2; 3|];;
let tabvide = [||];; (* Un tableau vide *)
let tabuni = Array.make 100 5.0;;
```
La dernière instruction génère un tableau à 100 éléments qui sont tous des flottants valant précisément `5.0`.

### Indexation 
Contrairement aux listes, les tableaux sont indexés, il est possible d'accéder au i-ème élément d'un tableau comme ceci :
```ocaml 
let a = tab.(i)
```
Cet accès présente une complexité en $\mathscr O(1)$, donc quasiment instantané.
Ceci est dû à la structure interne des tableaux, en effet (en notant `&` "adresse de") :
`&t.(i) = &t.(o) + (i * &(int))` (i.e. l'adresse du i-ème élément est à l'adresse du début + i fois la taille d'un int, cf schéma plus haut.)

De même, un appel :
```ocaml
Array.lenght t;;
```
est en $\mathscr O(1)$ contrairement au même appel pour une liste qui serait en $\mathscr O(n)$.

### Affectation
Afin de changer la valeur du i-ème élément on effectue l'instruction suivante :
```ocaml
t.(i) <- 42;;
```

## Matrices
En OCaml, les matrices sont des tableaux de tableaux.
```ocaml
let m1 = Array.make 2 [||];;
m1.(0) <- [|1; 2; 3|];
m1.(1) <- [|10; 20; 30|];
;;

(* Autre méthode *)
let m2 = Array.make_matrix 2 3 0;;
```
On a ici défini deux matrices : $M_1 = \left(\begin{array}{ccc} 1 & 2 & 3 \\ 10 & 20 & 30\end{array}\right)$ et $M_2 = \left(\begin{array}{ccc} 0 & 0 & 0 \\ 0 & 0 & 0\end{array}\right)$. 

## Parcours avec des boucles
On peut afficher tous les éléments d'un tableau à l'aide d'une boucle.
Du début à la fin...
```ocaml
let t = [|10; 20; 30|] in 
	for i = 0 to (Array.length t - 1) do
		Print.printf "t[%d]=%d\n" i t.(i);
	done;; 
```
...ou de la fin au début.
```ocaml
let t = [|10; 20; 30|] in 
	for i = (Array.length t - 1) downto 0 do
		Print.printf "t[%d]=%d\n" i t.(i);
	done;; 
```
