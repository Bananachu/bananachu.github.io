# Tableaux en OCaml

## Fonctionnement interne
Contrairement aux listes où chaque élément est un couple (valeur, pointeur), ici tous les éléments sont contigus dans la mémoire. Donc là où pour une liste l'ordinateur doit parcourir les i-1 éléments avant d'arriver au i-ème, il suffit ici de regarder à l'adresse mémoire $\mathrm{add}(\texttt{tab}) + i \times \texttt{taille}$, avec $\mathrm{add}(\texttt{tab})$ l'adresse mémoire du tableau et $\texttt{taille}$ la taille d'un élément du tableau. Représentons ici schématiquement un bout de mémoire vive :

| $\mathrm{add}(\texttt{tab}) + \texttt{taille}$ | $\mathrm{add}(\texttt{tab}) + 2 \times \texttt{taille}$ |     …     | $\mathrm{add}(\texttt{tab}) + i \times \texttt{taille}$ |     …     |
|:------|:------|:------|:------|:------|
| `tab.(0)` | `tab.(1)` | … | `tab.(i-1)` | … |

> N'oublions pas que le i-ème élément se situe à l'indice `i-1` !

On voit que ceci permet d'accéder au i-ème élément du tableau en $\mathscr O(1)$, contrairement à une liste où l'action se fait en $\mathscr O(i)$.<br>
Nous verrons plus bas que ce fonctionnement nous permet aussi de changer la valeur d'un élément du tableau à la volée, puisqu'il sagit juste de réécrire à un endroit connu dans la mémoire.<br>
Toutefois, il est nécessaire que tous les éléments d'un tableau soient de même taille et de même type. La taille d'un tableau est de plus fixée à la création, puisqu'on réserve un gros bout de mémoire pour le stocker.<br>
Il est virtuellement possible d'ajouter un élément au bout d'un tableau mais cela se traduit en fait par la création d'un tableau plus grand de 1 élément dans lequel on copie toutes les autres valeurs, donc une complexité linéaire, contrairement aux listes ou cela est en temps constant.


## Premières manipulations

### Création
```ocaml
let t = [|1; 2; 3|];;
let tabvide = [||];; (* Un tableau vide *)
let tabuni = Array.make 100 5.0;;
```
Le tableau `tabuni` a 100 éléments qui sont tous des flottants valant précisément `5.0`.

### Indexation 
La structure interne des tableaux permet d'accéder directement à leur i-ème élément via l'instruction :
```ocaml 
let a = tab.(i)
```
Comme vu plus tôt, cet accès présente une complexité en $\mathscr O(1)$ quelque soit l'indice `i`.

### Réaffectation
Afin de changer la valeur du i-ème élément on effectue l'instruction suivante :
```ocaml
t.(i) <- 42;;
```
> Cette syntaxe ressemble à la notation algorithmique.

### Le module `Array`
Comme pour les listes, OCaml fournit par défaut une bibliothèque contentant certaines fonctions de base pour manipuler les tableaux. Ces fonctions sont a priori rappelées dans les sujets de concours et non-utilisables a priori mais il est bon d'en connaître quelques-unes :
```ocaml
Array.length t;;
(* Renvoie la taille du tableau t*)

let l = [1; 2; 3] in Array.of_list l;;
(* Crée un tableau avec les éléments de la liste l *)

let tab = [|1; 2; 3|] in Array.to_list tab;;
(* Crée une liste avec les éléments de tab *)
```
Remarquons que la structure interne des tableaux permet que `Array.length` soit en $\mathscr O(1)$, contrairement à `List.length` qui est linéaire. La taille du tableau est en effet fixé à la création et n'a pas besoin d'être calculée.
`Array.of_list` et `Array.to_list` sont quant à eux linéaires de manière assez évidente.


## Matrices
En OCaml, les matrices sont des tableaux de tableaux et peuvent être définies de deux manières :
```ocaml
let m1 = Array.make 2 [||];;
m1.(0) <- [|1; 2; 3|];
m1.(1) <- [|10; 20; 30|];
(* cf. cours d'introduction pour cette syntaxe impérative *)

let m2 = Array.make_matrix 2 3 0;;
```
On a ici défini deux matrices :
<div style="display:flex; align-items:center; gap:1em;">
  <div>$$M_1 = \begin{pmatrix}1 & 2 & 3 \\ 10 & 20 & 30\end{pmatrix}$$</div>
  <div> et </div>
  <div>$$M_2 = \begin{pmatrix} 0 & 0 & 0 \\ 0 & 0 & 0\end{pmatrix}$$</div>
  <div>.</div>
</div>

## Parcours avec des boucles
On peut afficher tous les éléments d'un tableau à l'aide d'une boucle `for`.
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
Cette syntaxe impérative n'est pas réservée aux tableaux mais leur nature indexée en fait de très bons usagers.
