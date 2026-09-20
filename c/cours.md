# Résumé de cours de C

## Les types

### Les types de base
Un type d'objet en C détermine l'**espace mémoire occupé par l'objet**, la **manière de représenter cet objet en binaire** et les **opérations possibles sur cet objet**. Nous reparlerons plus bas des différents opérateurs.

| Préfixe | Taille en octets | Encodage | Spécificateur "par défaut" |
|:------|:------|:------| :------ |
| `char` | 1                | entier non signé | `%c` |
| `int`<br>`short`<br>`short int` | 2 | entier signé | `%d` ou `%i` |
| `long int`<br>`long` | 4 | entier signé | `%ld` ou `%li` |
| `long long int`<br>`long long` | 8 | entier signé | `%lld` ou `%lli` |
| `float` | 4 | flottant | `%f` |
| `double` | 8 | flottant | `%lf` |
| `long double` | 16 | flottant | `%Lf` |
Pour tout les types il est possible de rajouter les préfixes `unsigned` ou `signed` pour changer leur aspect signé. Le spécificateur pour tout `unsigned` est `%u` (ou `%lu`, ou `%llu`, ou `%Lu` avec la même logique que précédemment.)

### Typecasting et spécificateurs
En C on peut "interpréter" le contenu binaire d'une variable de la manière qu'on veut. Un exemple simple à comprendre : 
```c
char a = (char)67;
printf("%c", a);    // On affiche "C", le caractère n°67 de la table ASCII.
```
Cette action est appelée **typecasting**.

Lorsqu'on veut afficher (resp. récupérer) une variable via `printf` (resp. `scanf`) on procède à une sorte de typecasting via les spécificateurs susmentionnés. On peut voir ça comme si le spécificateur disait à l'ordinateur comment interpréter les octets qui vont suivre. En fait, on *peut* utiliser n'importe quel spécificateur avec n'importe quel type de variable, mais si on ne sait pas ce qu'on fait on s'expose à des risques du style :
- Seulement une partie de la variable est traitée (par exemple si on utilise `%d` sur un `long`)
- Ne pas afficher ce qu'on voulait (par exemple un entier au lieu du caractère, ou réciproquement, ou bien un nombre négatif qui apparaît comme un grand entier)
Ainsi en général on utilise les spécificateurs *ad hoc*, mais il peut être intéressant de s'intéresser à des cas extrêmes pour comprendre ce qu'il se passe sous le capot.

Exemple de choses observables (ce sont a priori de mauvaises pratique, seulement pour s'amuser !) :
```c
int n = 26945;    // En binaire : 01101001 01000001.
printf("%c", n);  // Qu'affichera-t-on ?
```
> Réponse : On affichera le caractère `A`. En effet, on interprète le contenu de `n` comme si c'était un `char` (car on a utilisé `%c`), or `n` est stocké sur deux octets soit deux fois plus qu'un `char`. Ainsi on ne traite que le dernier octet de `n` :  `01000001` i.e. 65 en base 10, ce qui correspond au caractère `A` sur la table ASCII.


```c
int n = -10;      // En binaire : 11111111 11110110.
printf("%u", n);  // Qu'affichera-t-on ?
```
> Reponse : On affichera l'entier `4294967286`. Il s'agit de la représentation en base 10 du nombre binaire  `11111111 11110110` quand on n'interprète ce dernier comme un entier non-signé.

### D'autres spécificateurs, plus niche encore...
> À passer en première lecture.

Outre les spécificateurs usuels il peut être intéressant de savoir qu'il en existe d'autres, très spécifiques et rares d'utilisation :

| Syntaxe | Usage |
|:------|:------|
| `%e` ou `%E` | Pour représenter un flottant en notation scientifique (avec `e` ou `E` à la place de "10^") |
| `%o` | Convertit l'entrée pour en donner une représentation en base 8. |
| `%x` ou `%X` | Convertit l'entrée pour en donner une représentation en base 16. |
| `%%` | Affiche le caractère `%` ou attend ce caractère dans l'entrée. |
| `%n` | Compte le nombre de caractère affichée ou entrés. Au lieu de lire le contenu d'une variable il va affecter la valeur à une variable, si tant est qu'on lui attribue un pointeur vers un entier. Essayer le code suivant pour comprendre. |
Pour comprendre ce que fait `%n` on peut expérimenter ceci (laissé au lecteur) :
```c
int a;
printf("blabla%n", &a);
printf("%d\n", a);
```
### Les pointeurs
Un pointeur est une variable qui contient une adresse mémoire. Il faut aussi préciser le type de ce vers quoi on pointe, afin que le compilateur sache comment interpréter ce qui s'y trouve. Ainsi la syntaxe pour déclarer un pointeur vers un entier est la suivante :
```c
int *p;
```
Il faut bien voir ici que le pointeur n'est pas du type  `int` mais bien `int *` ; `a` n'est pas un entier mais un pointeur vers un entier.

Lorsqu'on manipule des pointeurs on est amenés à utiliser plusieurs syntaxes, il faut bien savoir ce que chacune d'elle fait.

| Syntaxe | Ce qu'on obtient                                                                                                                                                                                                                                                                               |
|:------|:------|
| `p`     | L'adresse mémoire enregistrée dans `p`. |
| `*p`    | Le contenu qui se trouve à l'adresse stockée dans p. |
| `&p`    | L'adresse mémoire de `p` QUI N'EST PAS l'adresse stockée dans `p`. Nous verrons cela dans le paragraphe "opérateurs" mais `&variable` renvoie l'adresse d'une variable sous forme de pointeur, ainsi dans notre exemple `&p` est un pointeur vers un pointeurs vers un entier (type `int **`). |
> La suite de cette partie viendra plus tard.

## Les boucles
Il existe en C trois types de boucles.
### Les boucles `while`
La syntaxe est très similaire à ce que proposent les autres langages, on évalue `condition` AVANT chaque début de boucle :
```c
while (condition) {  // par exemple "i < 5"
	// des instructions
}
```
Attention aux boucles infinies !
### Les boucles `do ... while`
Le concept est similaire à ce qu'on a avant sauf qu'ici on est certain qu'au moins un tour de boucle est effectué. Notons que la condition d'arrêt est tout de même vérifiée AVANT chaque tour une fois que le premier tour est fait.
```c
do {
// des instructions
} while (condition);
```
### Les boucles `for`
Formellement la syntaxe d'une boucle `for` en C est la suivante :
```c
for (initialisation ; condition ; incr) {
// instructions
}
```
Sachant que :
- `initialisation` est une instruction effectuée une et une seule fois uniquement au démarrage.
- `condition` est notre condition d'arrêt vérifiée AVANT chaque tour de boucle.
- `incr` est une instruction réalisée à chaque fin de tour.
Très souvent on écrira quelque chose comme ceci :
```c
for (int i = 0; i < 5; i++) {
	// une boucle qui fera 5 tours
}
```
Ce qui est syntaxiquement équivalent à ceci :
```c
int i = 0;
while (i < 5) {
	// des instructions
	i++;
}
```
