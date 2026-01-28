# Présentation du OCaml en MPSI

OCaml est un langage fonctionnel, contrairement à Python par exemple qui est un langage impératif. Cette différence de paradigme peut s'illustrer simplement : un programme Python (par exemple) est une sorte de recette de cuisine - on exécute des étapes les unes à la suite des autres. En OCaml, on va plutôt donner des expressions évaluables, un peu comme un calcul. Gardons l'analogie culinaire et comparons les deux approches avec une recette simplifiée de gâteau.
Le programmeur Python verra la situation comme suit :
1. mélanger ingrédients
2. mettre pâte dans moule
3. cuire
4. renvoyer le gâteau

Son collègue amateur de OCaml pensera plutôt de cette manière :
`gâteau = cuire(pâte)` où `pâte = mélange(ingrédients)`
Le professeur d'option informatique de ce collègue, non-moins fou et ne redoutant pas le diabète provoqué par abus de sucre syntaxique pourrait même penser :
`gâteau = cuire @@ mélange (ingrédients)`
> lire `@@` comme l'opérateur composé de fonctions.

Bien que cela ne se voie pas explicitement dans cet exemple, la programmation fonctionnelle a pour avantage une certaine fiabilité ; un programme OCaml ne peut planter à partir du moment où il est compilé/interprété. On ignore s'il fera ce qu'on veut, mais si l'interpréteur l'accepte alors il fera quelque chose. En Python, lancez un programme contenant une fonction prenant en paramètre un entier, et si par malheur vous appelez cette fonction avec autre chose qu'un entier on ne sait pas ce qui peut arriver (Python essayera souvent de vous sauver mais d'autres langages pourraient réellement faire n'importe quoi, ou _au mieux_ planter).

En contrepartie, une telle programmation nécessite quelques adaptations pour l'impérativiste en rédemption : plus de variables mutables, plus de boucles, plus de `return`, surutilisation de la récursion... Qu'il ne panique pas pour autant, ce paradigme fonctionnel n'est pas si obscur et tout viendra avec un peu d'expérience. Voyons maintenant la syntaxe du OCaml pour s'armer face à cette transition.

> Les paragraphes écrits avec une barre en marge sont des remarques destinées à approfondir une notion où à développer une subtilité. Ils ne sont pas indispensables mais peuvent améliorer la compréhension du sujet. Lisez-les, mais ne paniquez pas si vous ne les comprenez pas.

Plus généralement ce cours se veut assez complet et aborde beaucoup de détails _peu_ utiles de prime abord. Revenez-y au cours de l'année si besoin et ne vous tracassez pas à tout apprendre, sauf si vous visez les ENS, et encore.
## Persistance des variables et typage fort
En OCaml les variables sont persistantes, c'est-à-dire qu'une variable définie ne change pas de valeur tout au long du programme. Il est toutefois possible de nommer une nouvelle variable de la même manière qu'une ancienne, laissant cette dernière au ramasse-miettes :
```ocaml
let x = 8;; (* On définit une variable *)
let x = 42;; (* On écrase le "vieux" x *)
```

> Notez qu'on réemploie le mot clef `let`. La syntaxe Python étant particulièrement ambiguë, cela ne vous choque pas forcément, mais une opération similaire en JavaScript aurait donné :
```js
var x = 8;
x = 42;
```
> (J'ai choisi le JavaScript puisque c'est éventuellement le seul autre langage qui est abordé dans une scolarité ante-MPSI mais ça aurait aussi été valable en C).

Voyez bien qu'ici le mot clef `var` n'est pas répété puisqu'on modifie vraiment la variable tandis qu'en OCaml on en définit une autre avec le même nom et on perd l'accès à la précédente. 

La persistance des variables implique aussi que l'interpréteur OCaml ne changera pas de lui même un type de variable comme Python par exemple. Chaque type a ses propres opérateurs dont la syntaxe est distincte et les opérations mixtes ne sont pas possibles *a priori*, typiquement :
```ocaml
let x = 2.71;;
let n = 8;;

let c = x + n;;
(* Erreur : on essaie d'ajouter un entier et un flottant *)
```
Détaillons à présent ces type et leur syntaxe associée.
## Types de données
### Les entiers `int`
Les nombres entiers, peu de différences avec leur implémentation dans d'autres langages. Leur taille mémoire dépend de l'architecture (63 bits pour de l'amd64, 31 bits pour du x86). Les opérateurs associés sont à peu près les mêmes que partout, à l'exception de `/` qui désigne ici la division euclidienne :
```ocaml
# let n = 42;;
val n : int = 42

# let k = n + 13 * 2 -1;;
val k : int = 67

# let p = 22 / 7;;
val p : int = 3

# let q = 22 mod 7;;  (* opérateur modulo *)
val q : int = 1
```
> Il n'y a pas d'opérateur puissance pour les `int`, mais il en existe un pour les `float`.

### Les flottants `float`
Encore une fois on retrouve les propriétés habituelles des nombres à décimaux. Bien qu'étant eux aussi des nombres, les opérateurs des `float` sont bien distincts de ceux des `int`. Aussi, bien que leur partie décimale puisse être nulle, un flottant OCaml **doit** comporter un point : `2.` est un `float` mais `2` est un `int`. Les opérateurs aussi se voient affublés d'un `.` :
```ocaml
# let e = 2.718;;
val e : float = 2.718

# let x = e +. 7. *. 3. -. 2.;
val e : float = 21.718

# let a = 5. /. 2.;;  (* division "classique" *)
val a : float = 2.5

# let y = 2. ** 7.2;;  (* exposant décimal *)
val y : float = 147.033389439620493
```

### Les booléens `bool`
Rien de nouveau sous le Soleil pour les booléens. La syntaxe est proche de celle du C, et les mot-clefs `true` et `false` s'écrivent sans majuscule :
```ocaml
# let t, f = true, false;;  (* un peu de sucre syntaxique *)
val t : bool = true
val f : bool = false

# let a = 2+2 = 5;;  (* nul besoin de parenthèses *)
val a : bool = false

# let b = not a || t;; (* non(a) ou t *)
val b : bool = true

# let c = t && f;;
val c : bool = false
```

> L'opérateur `||` (resp. `&&`) est paresseux : si l'expression de gauche est évaluée `true` (resp. `false`) alors l'expression de droite ne sera pas évaluée et le tout renverra `true` (resp. `false`).

> Ne surtout pas _pythonner_ à coup de `and` au lieu de `&&` ! L'opérateur `and` existe bel et bien en OCaml mais ne sert pas à l'algèbre booléenne, nous y reviendrons plus tard (c'est encore une fois du sucre syntaxique...). Dans la même veine, les anciennes versions d'OCaml permettaient la syntaxe `or` pour `||` mais ce n'est plus le cas depuis OCaml 5.1.

---

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
