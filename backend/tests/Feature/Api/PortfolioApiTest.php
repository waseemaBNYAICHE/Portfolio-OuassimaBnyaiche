<?php

namespace Tests\Feature\Api;

use App\Models\Skill;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class PortfolioApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_public_can_read_active_skills(): void
    {
        Skill::create(['name' => 'Laravel', 'proficiency' => 90, 'active' => true]);
        $this->getJson('/api/skills')->assertOk()->assertJsonFragment(['name' => 'Laravel']);
    }

    public function test_public_can_send_contact_message(): void
    {
        $this->postJson('/api/contact', ['name' => 'Visiteur', 'email' => 'visitor@example.com', 'message' => 'Bonjour, je souhaite discuter de mon projet.'])->assertCreated();
        $this->assertDatabaseHas('contact_messages', ['email' => 'visitor@example.com']);
    }

    public function test_admin_routes_are_protected(): void
    {
        $this->getJson('/api/admin/skills')->assertUnauthorized();
        Sanctum::actingAs(User::factory()->create());
        $this->getJson('/api/admin/skills')->assertOk();
    }
}
