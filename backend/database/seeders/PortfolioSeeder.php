<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Profile;
use App\Models\Service;
use App\Models\Skill;
use App\Models\SocialLink;
use App\Models\Technology;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@portfoliohub.test')],
            ['name' => env('ADMIN_NAME', 'Ouassima Bnyaiche'), 'password' => Hash::make(env('ADMIN_PASSWORD', 'ChangeMe123!'))]
        );

        Profile::updateOrCreate(['user_id' => $user->id], [
            'full_name' => 'Ouassima Bnyaiche',
            'headline' => 'Développeuse Full Stack',
            'bio' => 'Je conçois des applications web modernes, performantes et sécurisées.',
            'location' => 'Tanger, Maroc',
            'availability' => 'available',
        ]);

        foreach (['Application web', 'API', 'UI/UX'] as $index => $name) {
            Category::updateOrCreate(['slug' => Str::slug($name)], ['name' => $name, 'display_order' => $index, 'active' => true]);
        }

        foreach (['React', 'TypeScript', 'Tailwind CSS', 'Laravel', 'PostgreSQL', 'Docker'] as $index => $name) {
            Technology::updateOrCreate(['slug' => Str::slug($name)], ['name' => $name, 'active' => true]);
            Skill::updateOrCreate(['name' => $name], ['category' => $index < 3 ? 'Frontend' : 'Backend & DevOps', 'proficiency' => 80, 'display_order' => $index, 'active' => true]);
        }

        $services = [
            ['Développement web', 'Création de sites et applications modernes et responsives.'],
            ['UI/UX Design', 'Conception d’interfaces claires, élégantes et accessibles.'],
            ['Intégration API', 'Connexion du frontend avec des API REST sécurisées.'],
        ];
        foreach ($services as $index => [$title, $description]) {
            Service::updateOrCreate(['slug' => Str::slug($title)], compact('title', 'description') + ['display_order' => $index, 'active' => true]);
        }

        $links = ['GitHub' => 'https://github.com/', 'LinkedIn' => 'https://www.linkedin.com/'];
        foreach ($links as $index => $url) SocialLink::updateOrCreate(['platform' => $index], ['url' => $url, 'display_order' => array_search($index, array_keys($links)), 'active' => true]);
    }
}
