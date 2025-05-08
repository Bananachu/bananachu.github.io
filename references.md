# Références

Il existe en OCaml un équivalent des pointeurs en C, les références. Elles se déclarent avec le mot clef `ref` comme suit :
```ocaml
let n = ref 0;;
- : int ref = {contents = 0}
```
Une référence est du type `ref xxx` avec `xxx` le type de contenu vers lequel elle réfère.
`n` est ici une adresse mémoire qui renvoie vers un `int` de valeur `0`. `n` ne pourra renvoyer que vers des `int`, mais il est possible de changer ce`0`, nous verrons ça plus bas.
Ces objets permettent donc d'avoir des sortes de variables mutables, comme en Python par exemple.

## Syntaxe
Pour accéder à l'objet situé dans l'adresse mémoire stockée dans `n` on écrit `!n`. Exemple :
```ocaml
!n;; 
- : int = 0
```

Pour modifier ce vers quoi l'adresse contenue en `n` pointe, on utilise l'opérateur `:=`. Exemple :
```ocaml
n := !n + 42;;
- : unit = ()

!n;; 
- : int = 42
```
