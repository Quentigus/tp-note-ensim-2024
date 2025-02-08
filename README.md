# Correction du TP noté

Il n'y a pas beaucoup de code dans cette correction, mais pas mal de commentaires pour expliquer les notions.

Les fichiers de style de cette correction sont écrit en SASS pour montrer les bases de la syntaxe.

## Fonctionnalités supplémentaires

Pour montrer un peu plus de code, cette application inclus quelques fonctionnalités supplémentaires :

* les héros générés au chargement de l'application ont un `score` et un indicateur `enRepos` généré aléatoirement
* l'enregistrement d'un héro est configurable
* le score d'un héro est forcément supérieur ou égal à `0`

## Tests unitaires (TU)

Cette correction contient des exemples de TU (avec une couverture de 100% 😎) pour exemple.

L'application est configurée pour que les TU s'éxécutent :

* dans la console et non pas dans le navigateur (dans un Chrome "Headless")
* et génèrent un compte-rendu au format HTML dans le dossier "coverage" (ouvrir le fichier "coverage/index.html" pour le consulter)

Lors des sessions d'écriture des TU, il est possible de lancer la commande `ng test` une seule fois et qu'elle éxécute les tests à chaque modification

```cmd
ng test --watch
```

Pour couper cette commande, faire `Ctrl+C` dans le terminal et valider avec `o`.
