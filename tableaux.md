# Tableaux en OCaml

## Fonctionnement interne
Contrairement aux listes où chaque élément est un couple (valeur, pointeur), ici tous les éléments sont contigus dans la mémoire. Notons que chaque élément est de taille 64bits. De fait, tous les éléments du tableau sont de même type et sa taille est fixée.
## Syntaxe
```ocaml
let tab = [|1; 2; 3|];;
let tab = [||];; (* Un tableau vide *)
```
### Indexation 
Contrairement aux listes, les tableaux sont indexés, il est possible d'accéder au i-ème élément d'un tableau comme ceci :
```ocaml 
let a = tab.(i)
```
Cette accès présente une complexité en $\mathscr O(1)$, donc quasiment instantané.
Ceci est dû à la structure interne des tableaux, en effet (en notant `&` "adresse de") :
`&t.(i) = &t.(o) + (i * &(int))` (i.e. l'adresse du i-ème élément est à l'adresse du début + i fois la taille d'un int)
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
### Génération
```ocaml
let t = Array.make 100 5.0;;
```
Cette instruction génère un tableau à 100 éléments qui sont tous des flottants valant précisément `5.0`.
### Matrices
En OCaml, les matrices sont des tableaux de tableaux.
```ocaml
let m = Array.make 2 [||];;
m.(0) <- [|1; 2; 3|];
m.(1) <- [|10; 20; 30|];
;;

(* Autre méthode *)
let m = Array.make_matrix 2 3 0;;
```
On a ici d'abord codé la matrice suivante : $` \left(\begin{array}{ccc} 1 & 2 & 3 \\ 10 & 20 & 30\end{array}\right) `$, puis une matrice $` 2\times 3 `$ de $` 0 `$. 

### Parcours avec des boucles
On peut afficher tous les éléments d'un tableau à l'aide d'une boucle.
```ocaml
let t = [|10; 20; 30|] in 
	for i = 0 to (Array.length t - 1) do
		Print.printf "t[%d]=%d\n" i t.(i);
	done;; 
```

```ocaml
let t = [|10; 20; 30|] in 
	for i = (Array.length t - 1) downto 0 do
		Print.printf "t[%d]=%d\n" i t.(i);
	done;; 
```
