<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Ticket;
use App\Models\User;
use Closure;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;
use Override;

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
            //            'category_ids' => $this->getRandomCategoryIDs(),
            'user_submitter_id' => $this->getUserByRole('admin'),
            'user_asignee_id' => $this->getUserByRole('admin'),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (Ticket $ticket) {
            $ticket
                ->categories()
                ->attach(
                    Category::inRandomOrder()
                        ->take(rand(1, Category::count()))
                        ->pluck('id')
                );
        });
    }
}
