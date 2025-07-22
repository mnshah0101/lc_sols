class Solution:
    def shiftingLetters(self, s: str, shifts: List[List[int]]) -> str:
        #we can put the + - in each part and then sweep
        shift_arr = [0] * len(s)
        new_word = ''
        for shift in shifts:
            start, end, direction = shift
            if direction == 0:
                direction = -1
            shift_arr[start] += direction
            if end < len(shift_arr) - 1:
                shift_arr[end+1] -= direction
        for i in range(1, len(shift_arr)):
            shift_arr[i] += shift_arr[i-1]
        for i, letter in enumerate(s):
            new_ascii = (ord(letter) - 97 + shift_arr[i]) % 26 + 97
            new_word += str(chr(new_ascii))
        return new_word
        
        


        