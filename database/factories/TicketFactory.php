<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Ticket>
 */
class TicketFactory extends Factory
{
    function getUserByRole(string $role)
    {
        return User::where('role', $role)->inRandomOrder()->first()->id;
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->word,
            'description' => $this->faker->sentence,
            'status' => fake()->randomElement(['open', 'in_progress', 'resolved', 'closed']), // If use enum maybe randomelement 0,1,2,3
            'priority' => fake()->randomElement(['low', 'medium', 'high']),
            'category_id' => Category::inRandomOrder()->first()->id,
            'user_submitter_id' => $this->getUserByRole('admin'),
            'user_asignee_id' => $this->getUserByRole('admin'),
        ];
    }
}
