def unique_longest_substring(input_string):
#initialising the requried instances
  last_occurrence = {}
  longest_length = 0
  longest_position = 0
  starting_position = 0
  current_length = 0

  for a, b in enumerate(input_string):
    l = last_occurrence.get(b, -1)
    # If no repetition within, no problems.
    if l < starting_position:
        current_length += 1
    else:
        # Check if it is the longest so far
        if current_length > longest_length:
            longest_position = starting_position
            longest_length = current_length
        # Cut the prefix that has repetition
        current_length -= l - starting_position
        starting_position = l + 1
    # In any case, update last occurrence
    last_occurrence[b] = a

  # if the longest substring is a suffix
  if current_length > longest_length:
    longest_position = starting_position
    longest_length = current_length

  return input_string[longest_position:longest_position + longest_length]


input = 'pwwkew'

print(f"The Longest unique substring in '{input}' is '{unique_longest_substring(input)}' Size: {len(unique_longest_substring(input))}")