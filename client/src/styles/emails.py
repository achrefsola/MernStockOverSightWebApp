import sys

# Open a file in write mode
log_file = open('output.log', 'w')

# Save the current standard output (console) so you can restore it later
original_stdout = sys.stdout 

# Print the prompt to the console using stderr (this will stay on console)
email = str(input('Donner un email: '))

# Redirect standard output to the file
sys.stdout = log_file


min_value = 100
max_value = 9999

# Generate and print email variations to the file
for i in range(min_value, max_value):
    print(email + str(i) )

# Restore standard output to the console
sys.stdout = original_stdout 

# Close the log file
log_file.close()

print("Emails have been written to output.log.")
