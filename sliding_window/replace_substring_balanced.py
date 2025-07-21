class Solution:
    def balancedString(self, s: str) -> int:
        if len(s) == 0:
            return 0
        #min lenght of the substring that can be replaced with any other string of the same length to make 
        #each of its characters appears n/4 times
        #min length of the subtring that can be replace dwit any other string of the samae length to make s balanced - substring we have to replace
        #check entire thing - if balanced we are good
        #to fix - we can change by even differences - we know how many we have to get and flip


        # for example with QQWE - 2 Q, 1 W, 0 R and 1 E - have to flip - find 
        # QQQW - 1 W - 3 Q - 0 -  0 - we have targets for each - we want n//4 for each - so we can find a substring that follows a certain amount - we want a substring wit 2 Q - we want to capture the excess
        n = len(s)
        count = Counter(s)
        need = n // 4
        need_graph = Counter()
        for u in count:
            if count[u] > need:
                need_graph[u] = count[u] - need
        if not need_graph:
            return 0
        #we want to find min window wit
        min_window = n
        left = 0
        curr = Counter(s[left])
        def valid(curr):
            for u in need_graph:
                if curr[u] < need_graph[u]:
                    return False
            return True
        for right in range(1,n):
            curr[s[right]] += 1
            while valid(curr) and left <= right:
                min_window = min(min_window, right - left + 1)
                curr[s[left]] -= 1
                if curr[s[left]] == 0:
                    del curr[s[left]]
                left += 1
        return min_window
        