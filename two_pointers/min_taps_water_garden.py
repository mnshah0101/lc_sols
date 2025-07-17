class Solution:
    def minTaps(self, n: int, ranges: List[int]) -> int:
        furthest_can_reach = [0] * (n+1)

        for i, tap in enumerate(ranges):
            tap_start = max(0, i - tap)
            tap_end = min(n, i + tap)
            furthest_can_reach[tap_start] = max(furthest_can_reach[tap_start], tap_end)
        taps = 0
        max_can_end =  0
        prev_reach = 0

        for i in range(n+1):
            if max_can_end < i:
                return -1
            if prev_reach < i:
                taps += 1
                prev_reach = max_can_end
            max_can_end = max(max_can_end, furthest_can_reach[i] )

        
        return taps
2