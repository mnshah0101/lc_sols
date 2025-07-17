class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        if len(s) < 3:
            return 0
        c = Counter(s[0])
        left = 0
        n = len(s)
        total = 0
        for right in range(1, len(s)):
            c[s[right]] += 1
            if len(c) < 3:
                continue
            total += n - right 
            while len(c) == 3:
                c[s[left]] -= 1
                if c[s[left]] == 0:
                    del c[s[left]]
                left += 1
                if len(c) == 3:
                    total += n - right 
        
        return total
            
        