<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use RuntimeException;

class CvPortfolioSeeder extends Seeder
{
public function run(): void
{
DB::transaction(function () {
$now = now();

$userId = DB::table('profiles')->value('user_id')
?? DB::table('users')->value('id');

if (!$userId) {
throw new RuntimeException(
'Aucun utilisateur trouvé. Créez d’abord le compte administrateur.'
);
}

DB::table('profiles')->updateOrInsert(
['user_id' => $userId],
[
'full_name' => 'Ouassima Bnyaiche',
'headline' => 'Technicienne informatique | Support IT & Développement Web',
'bio' => 'Technicienne spécialisée en techniques de développement multimédia, avec plusieurs années d’expérience en développement web, maintenance informatique et assistance technique.',
'location' => 'Tanger, Maroc',
'availability' => 'available',
'phone' => '+212 657 005 029',
'email' => 'ouassima.bnyaichee@gmail.com',
'updated_at' => $now,
'created_at' => $now,
]
);

DB::table('educations')->delete();

DB::table('educations')->insert([
[
'diploma' => 'Diplôme de Technicien Spécialisé en Techniques de Développement Multimédia',
'institution' => 'Institut Spécialisé dans les Nouvelles Technologies de l’Information et de la Communication (OFPPT)',
'location' => 'Tanger, Maroc',
'start_date' => '2015-09-01',
'end_date' => '2017-07-31',
'description' => 'Formation spécialisée en développement multimédia et technologies web.',
'display_order' => 1,
'active' => true,
'created_at' => $now,
'updated_at' => $now,
],
[
'diploma' => 'Baccalauréat scientifique',
'institution' => 'Lycée Roi Fahd Ibn Abdelaziz',
'location' => 'Tanger, Maroc',
'start_date' => '2014-09-01',
'end_date' => '2015-07-31',
'description' => 'Formation secondaire scientifique.',
'display_order' => 2,
'active' => true,
'created_at' => $now,
'updated_at' => $now,
],
]);

DB::table('experiences')->delete();

DB::table('experiences')->insert([
[
'title' => 'Développeuse web',
'company' => 'SUPLEOR (Groupe Mentor)',
'location' => 'Tanger, Maroc',
'start_date' => '2022-11-01',
'end_date' => '2024-04-30',
'description' => 'Développement et maintenance de sites web responsives, résolution des problèmes techniques, amélioration des fonctionnalités et assistance aux clients.',
'technologies' => json_encode(['HTML5', 'CSS3', 'JavaScript', 'PHP', 'WordPress', 'Responsive Design']),
'current' => false,
'display_order' => 1,
'active' => true,
'created_at' => $now,
'updated_at' => $now,
],
[
'title' => 'Développeuse web & Support informatique',
'company' => 'MAVISTRO',
'location' => 'Tanger, Maroc',
'start_date' => '2021-05-01',
'end_date' => '2021-07-31',
'description' => 'Développement d’interfaces web responsives pour une application ERP, intégration, correction des bugs et optimisation de l’expérience utilisateur.',
'technologies' => json_encode(['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'ERP', 'Support IT']),
'current' => false,
'display_order' => 2,
'active' => true,
'created_at' => $now,
'updated_at' => $now,
],
[
'title' => 'Développeuse web',
'company' => 'FAST PROFESSIONNEL',
'location' => 'Tanger, Maroc',
'start_date' => '2019-07-01',
'end_date' => '2020-09-30',
'description' => 'Création et maintenance de sites web, installation de postes, imprimantes et périphériques, diagnostic des pannes et assistance aux utilisateurs.',
'technologies' => json_encode(['Web', 'WordPress', 'Windows', 'Maintenance informatique', 'Support IT']),
'current' => false,
'display_order' => 3,
'active' => true,
'created_at' => $now,
'updated_at' => $now,
],
[
'title' => 'Développeuse web & Graphiste',
'company' => 'FAST PROFESSIONNEL',
'location' => 'Tanger, Maroc',
'start_date' => '2018-02-01',
'end_date' => '2019-07-31',
'description' => 'Création de sites web, conceptions graphiques publicitaires, mise à jour des interfaces et résolution des problèmes techniques.',
'technologies' => json_encode(['Web', 'WordPress', 'Adobe Creative Cloud', 'Graphisme']),
'current' => false,
'display_order' => 4,
'active' => true,
'created_at' => $now,
'updated_at' => $now,
],
]);

DB::table('skills')->delete();

$skills = [
['HTML5', 'Front-end', 95],
['CSS3', 'Front-end', 95],
['JavaScript ES6', 'Front-end', 90],
['React.js', 'Front-end', 88],
['Vue.js', 'Front-end', 88],
['Bootstrap', 'Front-end', 90],
['Responsive Design', 'Front-end', 95],
['PHP', 'Back-end', 90],
['Laravel', 'Back-end', 90],
['Java', 'Back-end', 78],
['Python', 'Back-end', 85],
['FastAPI', 'Back-end', 80],
['API REST', 'Back-end', 90],
['MySQL', 'Bases de données', 90],
['PostgreSQL', 'Bases de données', 88],
['SQL Server', 'Bases de données', 80],
['Merise MCD/MLD', 'Conception', 88],
['Git & GitHub', 'DevOps', 90],
['Docker & Docker Compose', 'DevOps', 88],
['GitHub Actions CI/CD', 'DevOps', 85],
['WordPress & Divi', 'CMS', 92],
['Adobe Creative Cloud', 'Création', 82],
['Support informatique', 'Support IT', 92],
['Maintenance matérielle et logicielle', 'Support IT', 90],
['Windows, Linux & TCP/IP', 'Support IT', 85],
];

foreach ($skills as $index => [$name, $category, $proficiency]) {
DB::table('skills')->insert([
'name' => $name,
'category' => $category,
'icon' => null,
'proficiency' => $proficiency,
'display_order' => $index + 1,
'active' => true,
'created_at' => $now,
'updated_at' => $now,
]);
}

DB::table('services')->delete();

DB::table('services')->insert([
[
'title' => 'Développement web',
'slug' => 'developpement-web',
'description' => 'Création d’applications et de sites web modernes, responsives, performants et sécurisés.',
'icon' => null,
'display_order' => 1,
'active' => true,
'created_at' => $now,
'updated_at' => $now,
],
[
'title' => 'Support informatique',
'slug' => 'support-informatique',
'description' => 'Assistance aux utilisateurs, installation des équipements et résolution des problèmes techniques.',
'icon' => null,
'display_order' => 2,
'active' => true,
'created_at' => $now,
'updated_at' => $now,
],
[
'title' => 'Maintenance et optimisation',
'slug' => 'maintenance-optimisation',
'description' => 'Maintenance des sites, correction des bugs et optimisation des performances.',
'icon' => null,
'display_order' => 3,
'active' => true,
'created_at' => $now,
'updated_at' => $now,
],
[
'title' => 'WordPress et création graphique',
'slug' => 'wordpress-creation-graphique',
'description' => 'Création de sites WordPress, intégration avec Divi et conception de supports graphiques.',
'icon' => null,
'display_order' => 4,
'active' => true,
'created_at' => $now,
'updated_at' => $now,
],
]);
});
}
}
