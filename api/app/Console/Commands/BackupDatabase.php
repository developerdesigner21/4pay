<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class BackupDatabase extends Command
{
    protected $signature = 'backup:database';
    protected $description = 'Backup the database';

    public function handle()
    {
        // Perform database backup logic here
        // For example, you can use mysqldump to create a backup file

        // Example: Backup MySQL database using mysqldump
        $fileName = 'backup-' . Carbon::now()->format('Y-m-d_H-i-s') . '.sql';
        $command = sprintf(
            'mysqldump -u%s -p%s %s > %s',
            config('database.connections.mysql.username'),
            config('database.connections.mysql.password'),
            config('database.connections.mysql.database'),
            storage_path('app/backups/' . $fileName)
        );

        exec($command);

        $this->info('Database backup created: ' . $fileName);
    }
}
