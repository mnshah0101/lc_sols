from collections import defaultdict
class Solution:
    def totalFruit(self, fruits: List[int]) -> int:
        if len(fruits) <=2:
            return len(fruits)
        c = Counter(fruits[:2])
        longest = 2
        left = 0
        for right in range(2, len(fruits)):
            c[fruits[right]] += 1
            if len(c) > 2 and (right - left + 1) < longest:
                continue
            while len(c) > 2:
                c[fruits[left]] -= 1
                if c[fruits[left]] == 0:
                    del c[fruits[left]]
                left += 1
            longest = max(right - left + 1, longest)
        return longest



        