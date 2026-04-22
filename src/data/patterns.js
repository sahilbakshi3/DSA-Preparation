export const PATTERNS = [
  {
    id: "two-pointers",
    label: "Two Pointers",
    color: "#3B8BD4",
    tag: "Array",
    tagColor: "#185FA5",
    category: "array",
    diff: "easy",
    complexity: { time: "O(n)", space: "O(1)" },
    signals: [
      "Sorted array / string — find a pair, triplet, or subarray",
      "Eliminate duplicates in-place from sorted array",
      "Palindrome check on a string",
      '"Two numbers that sum to target" on sorted input',
      "Partitioning array (0s, 1s, 2s — Dutch flag)",
      "Container with most water — maximize area",
    ],
    keywords: [
      "sorted",
      "pair",
      "sum=k",
      "palindrome",
      "reverse",
      "in-place",
      "two numbers",
      "container with water",
      "3sum",
    ],
    notThis:
      "If array is unsorted and you need pairs → use HashMap (O(1) lookup). Two Pointers on unsorted = O(n²).",
    flow: `Is input SORTED (or does sorting help)?
  YES → Two Pointers (l=0, r=n-1, converge based on comparison)
  NO  → Try HashMap for pair lookups instead

Need CONTIGUOUS subarray/substring?
  YES → Sliding Window (not Two Pointers)`,
    traps: [
      "Two Pointers ≠ Sliding Window. Both use l,r but different directions (converging vs both-right)",
      "Don't use on unsorted arrays for pair sums — HashMap is O(n) + O(n) space vs O(n²)",
      "3Sum: sort first, outer loop fixes one element, inner two-pointer finds pairs",
    ],
    vs: {
      a: {
        label: "Two Pointers",
        desc: "Converging from both ends. Input sorted.",
      },
      b: {
        label: "Sliding Window",
        desc: "Both pointers move RIGHT. Window expands/shrinks.",
      },
    },
    problems: [
      { name: "Two Sum II", diff: "easy" },
      { name: "3Sum", diff: "medium" },
      { name: "Container With Most Water", diff: "medium" },
      { name: "Valid Palindrome", diff: "easy" },
      { name: "Trapping Rain Water", diff: "hard" },
      { name: "Dutch National Flag", diff: "medium" },
    ],
  },
  {
    id: "sliding-window",
    label: "Sliding Window",
    color: "#1D9E75",
    tag: "Array/String",
    tagColor: "#0F6E56",
    category: "array",
    diff: "medium",
    complexity: { time: "O(n)", space: "O(1) or O(k)" },
    signals: [
      "Longest/shortest CONTIGUOUS subarray or substring with constraint",
      '"At most K distinct characters/elements"',
      '"Minimum window containing all chars of pattern"',
      "Fixed window size — max/min sum of subarray of size K",
      "Replace at most K chars to make longest repeating substring",
      "Max consecutive ones with at most K flips",
    ],
    keywords: [
      "contiguous",
      "substring",
      "subarray",
      "window",
      "at most k",
      "longest without",
      "minimum window",
      "consecutive",
      "k flips",
    ],
    notThis:
      "If answer at i depends on dp[i-k] or prior computed results → DP. Negative values + sum=k → Prefix Sum.",
    flow: `Can window validity be defined by ONE condition on l and r?
  YES → Can you update state O(1) when expanding r / shrinking l?
    YES → SLIDING WINDOW
    NO  → SW + Data Structure (HashMap, Deque, Heap)
  NO  → DP

Variable window: expand r until invalid → shrink l until valid
Fixed window: slide forward maintaining exact size K`,
    traps: [
      '"Contiguous subarray" ≠ always sliding window. Max subarray sum = Kadane\'s (DP)',
      "When window needs max/min of contents → Monotonic Deque inside SW",
      "Negative values: sliding window won't work for sum=k → use Prefix Sum + HashMap",
    ],
    vs: {
      a: { label: "Fixed Window", desc: "Size K constant. Slide 1 step." },
      b: {
        label: "Variable Window",
        desc: "Expand r until invalid, shrink l until valid.",
      },
    },
    problems: [
      { name: "Longest Substring Without Repeating", diff: "medium" },
      { name: "Minimum Window Substring", diff: "hard" },
      { name: "Longest Repeating Char Replacement", diff: "medium" },
      { name: "Max Consecutive Ones III", diff: "medium" },
      { name: "Fruits Into Baskets", diff: "medium" },
      { name: "Permutation in String", diff: "medium" },
    ],
  },
  {
    id: "binary-search",
    label: "Binary Search",
    color: "#BA7517",
    tag: "Array",
    tagColor: "#854F0B",
    category: "array",
    diff: "medium",
    complexity: { time: "O(log n)", space: "O(1)" },
    signals: [
      'Sorted array + "find target" → immediate BS',
      '"Search in rotated sorted array" — modified BS',
      'Answer lies in monotonic range → "Binary search on answer"',
      '"Minimum/maximum value such that condition holds"',
      "Finding peak element, Kth smallest, capacity/feasibility problems",
      '"Can we achieve X within Y constraints?" — check feasibility, BS on X',
    ],
    keywords: [
      "sorted",
      "find target",
      "rotated",
      "minimum capacity",
      "kth",
      "feasible",
      "can we achieve",
      "peak",
      "split array",
      "koko",
      "ship",
    ],
    notThis:
      "Unsorted and need to find → sort first OR HashMap. Non-monotonic condition → can't binary search on answer.",
    flow: `Is input sorted OR is answer space MONOTONIC?
  YES → Binary Search

"Find minimum X such that condition(X) is true"?
  YES → Binary Search on the ANSWER
  → lo = min possible answer, hi = max possible answer
  → Binary search that range, check feasibility each iteration

Rotated sorted array?
  → Find which half is sorted, determine which half target is in`,
    traps: [
      "lo=mid vs lo=mid+1: use lo=mid ONLY when hi=mid. Wrong choice → infinite loop",
      '"BS on Answer" trips everyone — the ARRAY isn\'t sorted, the ANSWER SPACE is monotonic',
      "mid = lo + (hi-lo)/2 to avoid integer overflow (not (lo+hi)/2)",
      "Off-by-one: lo<=hi for exact match; lo<hi for boundary problems",
    ],
    vs: {
      a: {
        label: "Classic BS",
        desc: "Find element in sorted array. O(log n).",
      },
      b: {
        label: "BS on Answer",
        desc: '"Min days to ship". Search answer range, verify with O(n) greedy check.',
      },
    },
    problems: [
      { name: "Binary Search", diff: "easy" },
      { name: "Search in Rotated Array", diff: "medium" },
      { name: "Koko Eating Bananas", diff: "medium" },
      { name: "Find Min in Rotated", diff: "medium" },
      { name: "Median of Two Sorted Arrays", diff: "hard" },
      { name: "Split Array Largest Sum", diff: "hard" },
    ],
  },
  {
    id: "prefix-sum",
    label: "Prefix Sum",
    color: "#9F77DD",
    tag: "Array",
    tagColor: "#534AB7",
    category: "array",
    diff: "easy",
    complexity: { time: "O(n) preprocess, O(1) query", space: "O(n)" },
    signals: [
      "Sum of any subarray [l,r] queried multiple times",
      '"Number of subarrays with sum = k" — prefix + HashMap',
      "2D matrix range sum queries",
      "Running total comparisons, difference arrays",
      '"Subarray sum divisible by k" — modular prefix sums',
    ],
    keywords: [
      "subarray sum",
      "range sum",
      "sum equals k",
      "number of subarrays",
      "running sum",
      "difference array",
      "divisible by k",
    ],
    notThis:
      "One-time single subarray sum → just iterate. Prefix shines for MULTIPLE queries or counting subarrays.",
    flow: `Multiple range sum queries?
  YES → prefix[i] = prefix[i-1] + nums[i]
       Query [l,r] = prefix[r] - prefix[l-1]

"Number of subarrays with sum = k"?
  YES → prefix + HashMap
       For each prefix[i]: check if (prefix[i] - k) in map
       map[prefix[i]]++ after check`,
    traps: [
      "Off-by-one is brutal. ALWAYS use prefix[0]=0 sentinel",
      '"Subarray sum = k" is NOT sliding window because values can be negative',
      "Modular arithmetic: (prefix[i] - prefix[j]) % k == 0 means same remainder",
    ],
    vs: {
      a: {
        label: "Prefix Sum",
        desc: "Precompute. Range query O(1). Works with negatives.",
      },
      b: {
        label: "Sliding Window",
        desc: "Only works with positive values + can shrink window.",
      },
    },
    problems: [
      { name: "Subarray Sum Equals K", diff: "medium" },
      { name: "Range Sum Query", diff: "easy" },
      { name: "Product of Array Except Self", diff: "medium" },
      { name: "Continuous Subarray Sum", diff: "medium" },
      { name: "Subarray Sum Divisible by K", diff: "medium" },
      { name: "Matrix Block Sum", diff: "medium" },
    ],
  },
  {
    id: "hashmap",
    label: "HashMap / HashSet",
    color: "#5DCAA5",
    tag: "Array/String",
    tagColor: "#0F6E56",
    category: "array",
    diff: "easy",
    complexity: { time: "O(n)", space: "O(n)" },
    signals: [
      '"Two Sum" — unsorted, find pair with target',
      "Count frequency of elements",
      "Find duplicate / first unique element",
      "Group anagrams (sorted string as key)",
      "Check permutation/anagram",
      "Detect cycle in linked list with visited set",
    ],
    keywords: [
      "frequency",
      "count",
      "duplicate",
      "anagram",
      "permutation",
      "two sum unsorted",
      "first unique",
      "group",
      "visited",
    ],
    notThis:
      "Sorted input for pair finding → Two Pointers (O(1) space). Prefix counting → might be cleaner.",
    flow: `Unsorted, need pair or existence check?
  YES → HashMap (key=value, val=index/count)

Count frequency of chars (lowercase only)?
  YES → int[26] array is faster than HashMap

Group by transformed property?
  YES → HashMap with computed key (e.g., sorted string for anagrams)`,
    traps: [
      "Don't HashMap when input sorted — Two Pointers is strictly better space-wise",
      "For char freq (lowercase) → int[26] array is faster + O(1) space",
      "HashMap amortized O(1) but worst case O(n) due to collisions — mention in interview",
    ],
    vs: {
      a: { label: "HashMap", desc: "Unsorted input. O(n) time + O(n) space." },
      b: {
        label: "Two Pointers",
        desc: "Sorted input. O(n) time + O(1) space.",
      },
    },
    problems: [
      { name: "Two Sum", diff: "easy" },
      { name: "Group Anagrams", diff: "medium" },
      { name: "Top K Frequent Elements", diff: "medium" },
      { name: "Valid Anagram", diff: "easy" },
      { name: "Longest Consecutive Sequence", diff: "medium" },
      { name: "First Unique Character", diff: "easy" },
    ],
  },
  {
    id: "monotonic",
    label: "Monotonic Stack / Deque",
    color: "#D85A30",
    tag: "Array",
    tagColor: "#993C1D",
    category: "array",
    diff: "hard",
    complexity: { time: "O(n)", space: "O(n)" },
    signals: [
      '"Next greater element" / "next smaller" to right or left',
      "Largest rectangle in histogram",
      "Sliding window maximum / minimum (Deque)",
      '"Daily temperatures" — days until warmer',
      "Trapping rain water (monotonic approach)",
      "Stock span problem",
    ],
    keywords: [
      "next greater",
      "next smaller",
      "daily temperatures",
      "histogram",
      "largest rectangle",
      "sliding window max",
      "stock span",
      "online stock",
    ],
    notThis:
      "Not every stack problem needs monotonic. Regular stack for balanced parens, DFS simulation.",
    flow: `Need "nearest greater/smaller" for each element?
  YES → Monotonic Stack
    Increasing stack → pop when current > top → gives NEXT GREATER
    Decreasing stack → pop when current < top → gives NEXT SMALLER

Need max/min of sliding window of size K?
  YES → Monotonic Deque
    Remove from BACK if new element is bigger (decreasing deque)
    Remove from FRONT when index out of window`,
    traps: [
      "Increasing vs decreasing direction is always confusing — derive from what invariant you're maintaining",
      "Deque for max: maintain DECREASING order. Front = current max. Pop back on bigger, pop front if stale",
      "Histogram: use increasing stack. When you pop, compute area with popped height",
    ],
    vs: {
      a: {
        label: "Monotonic Stack",
        desc: "Next greater/smaller. O(n). Each element pushed/popped once.",
      },
      b: {
        label: "Monotonic Deque",
        desc: "Sliding window max/min. O(n). Front = max, remove stale from front.",
      },
    },
    problems: [
      { name: "Daily Temperatures", diff: "medium" },
      { name: "Next Greater Element I", diff: "easy" },
      { name: "Largest Rectangle in Histogram", diff: "hard" },
      { name: "Sliding Window Maximum", diff: "hard" },
      { name: "Trapping Rain Water", diff: "hard" },
      { name: "Online Stock Span", diff: "medium" },
    ],
  },
  {
    id: "greedy",
    label: "Greedy",
    color: "#E24B4A",
    tag: "Various",
    tagColor: "#A32D2D",
    category: "array",
    diff: "medium",
    complexity: { time: "O(n) or O(n log n)", space: "O(1)" },
    signals: [
      '"Maximum non-overlapping intervals" → greedy + sort by end time',
      '"Minimum jumps to reach end"',
      '"Can you reach the last index" → track max reach',
      "Assign tasks / schedule meetings optimally",
      '"At each step, pick the locally best option and it never hurts later"',
      "Gas station problem — circular greedy",
    ],
    keywords: [
      "maximum number of",
      "minimum operations",
      "can you reach",
      "non-overlapping",
      "schedule",
      "assign",
      "jump game",
      "gas station",
      "intervals",
      "lemonade change",
    ],
    notThis:
      "Future choices affect current optimal → DP. Greedy never looks back or reconsiders.",
    flow: `Clear "best local choice" at each step?
  Can making that choice EVER hurt the global answer?
    NO → GREEDY 

Verify with exchange argument:
  "If I swap two adjacent choices, does the answer get worse?"
  If worse both ways → proof of greedy correctness

Order matters for greedy?
  YES → SORT FIRST, then greedy
  Intervals → sort by end time
  Jump game → no sort needed`,
    traps: [
      "Greedy fails when subproblems interact — verify with exchange argument first",
      "Many greedy problems need no sort (Jump Game, Gas Station)",
      "Sort by END for 'max non-overlapping'. Sort by START for 'merge overlapping'",
    ],
    vs: {
      a: {
        label: "Greedy",
        desc: "Local optimal → global optimal. O(n). Never reconsider.",
      },
      b: {
        label: "DP",
        desc: "Subproblems interact. Cache results. Slower but always correct.",
      },
    },
    problems: [
      { name: "Jump Game", diff: "medium" },
      { name: "Jump Game II", diff: "medium" },
      { name: "Non-overlapping Intervals", diff: "medium" },
      { name: "Gas Station", diff: "medium" },
      { name: "Assign Cookies", diff: "easy" },
      { name: "Partition Labels", diff: "medium" },
    ],
  },
  {
    id: "intervals",
    label: "Intervals",
    color: "#F09595",
    tag: "Array",
    tagColor: "#A32D2D",
    category: "array",
    diff: "medium",
    complexity: { time: "O(n log n)", space: "O(n)" },
    signals: [
      '"Merge overlapping intervals"',
      '"Insert interval" into sorted list',
      '"Minimum meeting rooms required"',
      '"Non-overlapping intervals" — remove minimum',
      '"Employee free time" — find gaps between intervals',
    ],
    keywords: [
      "intervals",
      "overlapping",
      "merge",
      "meeting rooms",
      "insert interval",
      "non-overlapping",
      "schedule",
      "free time",
      "calendar",
    ],
    notThis:
      "If intervals already sorted, skip sort step. Not all interval problems are greedy.",
    flow: `Sort by START time for:
  → Merge overlapping
  → Insert interval

Sort by END time for:
  → Max non-overlapping (greedy: keep earliest ending)
  → Minimum removal

Meeting rooms (min rooms needed):
  Option 1: Sort starts[] and ends[] SEPARATELY → two-pointer
  Option 2: Min-heap of end times, greedily reuse rooms`,
    traps: [
      "Sort by END for removal/scheduling, by START for merging — don't mix them up",
      "Edge case: [1,4] and [4,5] — do they overlap? Check problem definition",
      "Insert interval: handle no-overlap cases on both left and right sides first",
    ],
    vs: {
      a: {
        label: "Sort by start",
        desc: "Merge overlapping, insert interval.",
      },
      b: {
        label: "Sort by end",
        desc: "Non-overlapping intervals, meeting scheduling (greedy).",
      },
    },
    problems: [
      { name: "Merge Intervals", diff: "medium" },
      { name: "Insert Interval", diff: "medium" },
      { name: "Meeting Rooms II", diff: "medium" },
      { name: "Non-overlapping Intervals", diff: "medium" },
      { name: "Employee Free Time", diff: "hard" },
      { name: "Minimum Arrows to Burst Balloons", diff: "medium" },
    ],
  },
  {
    id: "dp-1d",
    label: "1D Dynamic Programming",
    color: "#D4537E",
    tag: "DP",
    tagColor: "#993556",
    category: "dp",
    diff: "medium",
    complexity: { time: "O(n)", space: "O(1) optimized" },
    signals: [
      '"Number of ways to reach step N"',
      '"Maximum profit/score with single decisions at each step"',
      "Current state depends on 1 or 2 prior states only",
      '"Decode ways" — decisions at each character',
      "House robber — can't pick adjacent",
      '"Word break" — can you partition string into dictionary words',
    ],
    keywords: [
      "climbing stairs",
      "house robber",
      "decode ways",
      "word break",
      "fibonacci",
      "min cost",
      "coin change",
      "max product subarray",
      "paint fence",
    ],
    notThis:
      "If state needs (i,j) pair → 2D DP. If greedy local choice works → Greedy.",
    flow: `Recurrence: dp[i] = f(dp[i-1], dp[i-2], ...)

Common forms:
  dp[i] = dp[i-1] + dp[i-2]           (Fibonacci: climbing stairs)
  dp[i] = max(dp[i-1], dp[i-2]+val)   (skip adjacents: house robber)
  dp[i] = min over all valid transitions

Space optimization:
  If dp[i] only needs dp[i-1] and dp[i-2] → use 2 variables O(1) space

Start with recursion + memo → identify pattern → convert to bottom-up`,
    traps: [
      "Define state CAREFULLY before coding. dp[i] = what exactly?",
      "Initialization: dp[0] and dp[1] are base cases — don't skip them",
      "Space optimize AFTER getting correct O(n) space solution first",
    ],
    vs: {
      a: {
        label: "Top-down (Memo)",
        desc: "Recursion + cache. Easier logic. Stack overflow risk.",
      },
      b: {
        label: "Bottom-up (Table)",
        desc: "Iterative fill. No recursion. Easier to space-optimize.",
      },
    },
    problems: [
      { name: "Climbing Stairs", diff: "easy" },
      { name: "House Robber", diff: "medium" },
      { name: "Coin Change", diff: "medium" },
      { name: "Decode Ways", diff: "medium" },
      { name: "Word Break", diff: "medium" },
      { name: "Min Cost Climbing Stairs", diff: "easy" },
    ],
  },
  {
    id: "dp-2d",
    label: "2D DP (LCS / Edit Distance / Knapsack)",
    color: "#c9963a",
    tag: "DP",
    tagColor: "#854F0B",
    category: "dp",
    diff: "hard",
    complexity: { time: "O(n*m)", space: "O(min(n,m))" },
    signals: [
      '"Longest Common Subsequence" of two strings',
      '"Edit Distance" — min operations to transform string',
      "0/1 Knapsack — include/exclude items with weight limit",
      '"Longest Common Substring" — contiguous version',
      '"Interleaving String" — can s3 be formed from s1 and s2',
      '"Distinct subsequences" — count ways to form t from s',
    ],
    keywords: [
      "LCS",
      "edit distance",
      "knapsack",
      "interleaving",
      "distinct subsequences",
      "longest common",
      "minimum operations",
      "transform",
    ],
    notThis:
      "If only ONE string/array (not two) → 1D DP. If choices are purely greedy → no DP needed.",
    flow: `Two strings s1,s2? State = dp[i][j] (first i chars of s1, first j of s2)

LCS:
  dp[i][j] = dp[i-1][j-1]+1        if s1[i]==s2[j]
  dp[i][j] = max(dp[i-1][j], dp[i][j-1]) otherwise

Edit Distance:
  dp[i][j] = dp[i-1][j-1]          if s1[i]==s2[j]
  dp[i][j] = 1+min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) otherwise

0/1 Knapsack:
  dp[i][w] = max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])
  Space opt: iterate w BACKWARDS to avoid reuse`,
    traps: [
      "0/1 Knapsack: iterate weight BACKWARDS in space-optimized to prevent reuse",
      "Unbounded Knapsack (coin change): iterate weight FORWARDS — reuse allowed",
      "LCS vs LCS-substring: substring is contiguous → reset to 0 when chars differ",
    ],
    vs: {
      a: {
        label: "0/1 Knapsack",
        desc: "Each item used at most once. Backward weight loop.",
      },
      b: {
        label: "Unbounded Knapsack",
        desc: "Items reusable (coin change). Forward weight loop.",
      },
    },
    problems: [
      { name: "Longest Common Subsequence", diff: "medium" },
      { name: "Edit Distance", diff: "hard" },
      { name: "Coin Change", diff: "medium" },
      { name: "Target Sum", diff: "medium" },
      { name: "Distinct Subsequences", diff: "hard" },
      { name: "Interleaving String", diff: "hard" },
    ],
  },
  {
    id: "dp-lis",
    label: "LIS / Interval DP / DP on Trees",
    color: "#9F77DD",
    tag: "DP",
    tagColor: "#534AB7",
    category: "dp",
    diff: "hard",
    complexity: { time: "O(n log n) for LIS", space: "O(n)" },
    signals: [
      '"Longest Increasing Subsequence" — classic LIS',
      '"Russian Doll Envelopes" — 2D LIS',
      '"Burst Balloons / Matrix Chain" — interval DP',
      "DP on tree nodes — dp[node] based on children",
      '"Maximum path sum" in binary tree',
      '"House Robber III" — tree version',
    ],
    keywords: [
      "longest increasing",
      "LIS",
      "envelopes",
      "burst balloons",
      "matrix chain",
      "tree dp",
      "house robber III",
      "diameter",
      "max path",
    ],
    notThis:
      "If subsequence needs to be contiguous → sliding window or Kadane's. Simple path → DFS with memoization.",
    flow: `LIS O(n²) DP:
  dp[i] = max(dp[j]+1) for all j<i where nums[j]<nums[i]

LIS O(n log n) patience sorting:
  Maintain tails[] array; binary search for insertion point

Interval DP: dp[i][j] = optimal for range [i..j]
  Enumerate split point k in [i..j-1]
  dp[i][j] = best over all k of dp[i][k] + dp[k+1][j] + cost

Tree DP: DFS post-order
  Compute dp for each subtree first
  dp[node] = f(dp[left], dp[right], node.val)`,
    traps: [
      "LIS O(n log n): tails[] is NOT the actual LIS — just its length. Reconstruct separately",
      "Interval DP: loops must process smaller intervals first (i >= j)",
      "Tree DP: often return two values from DFS (include root vs exclude root)",
    ],
    vs: {
      a: { label: "LIS O(n²)", desc: "Simple DP. Easy to reconstruct path." },
      b: {
        label: "LIS O(n log n)",
        desc: "Patience sorting + binary search. Can't reconstruct easily.",
      },
    },
    problems: [
      { name: "Longest Increasing Subsequence", diff: "medium" },
      { name: "Russian Doll Envelopes", diff: "hard" },
      { name: "Burst Balloons", diff: "hard" },
      { name: "House Robber III", diff: "medium" },
      { name: "Binary Tree Max Path Sum", diff: "hard" },
      { name: "Min Cost to Cut a Stick", diff: "hard" },
    ],
  },
  {
    id: "bst",
    label: "Binary Search Tree (BST)",
    color: "#378ADD",
    tag: "Tree",
    tagColor: "#185FA5",
    category: "graph",
    diff: "medium",
    complexity: { time: "O(log n) avg, O(n) worst", space: "O(h)" },
    signals: [
      "In-order traversal of BST = sorted array (use this!)",
      '"Kth smallest element" in BST → in-order k-step',
      '"Validate BST" — pass min/max bounds down recursively',
      '"Find successor/predecessor" in BST',
      '"Convert sorted array to BST" — pick mid as root',
      '"Lowest Common Ancestor" of BST — use BST property',
    ],
    keywords: [
      "BST",
      "binary search tree",
      "inorder sorted",
      "kth smallest",
      "validate BST",
      "LCA",
      "successor",
      "predecessor",
      "insert BST",
      "delete BST",
    ],
    notThis:
      "Generic binary tree (no ordering property) → use DFS/BFS. BST-specific optimizations don't apply.",
    flow: `BST KEY PROPERTY: left < root < right (ALL subtree, not just direct children)

Validate BST:
  Pass (min, max) bounds: left subtree root must be in (min, root.val)

In-order = sorted:
  Kth smallest: in-order traversal, count to k
  Sorted array to BST: pick middle recursively

LCA in BST:
  Both < root → go left
  Both > root → go right
  Split → current node IS the LCA

Delete: 3 cases
  No child → remove
  One child → replace with child
  Two children → replace with inorder successor (leftmost in right subtree)`,
    traps: [
      "BST validity: ALL left subtree values < root, not just direct child. Use bounds propagation!",
      "Deletion with two children: replace with inorder successor (leftmost of right subtree)",
      "Unbalanced BST: O(n) worst case for all ops. AVL/Red-Black maintain O(log n)",
    ],
    vs: {
      a: { label: "BST", desc: "Ordered. O(log n) avg. In-order = sorted." },
      b: {
        label: "Generic Binary Tree",
        desc: "No order. All ops need full traversal O(n).",
      },
    },
    problems: [
      { name: "Validate Binary Search Tree", diff: "medium" },
      { name: "Kth Smallest in BST", diff: "medium" },
      { name: "LCA of BST", diff: "medium" },
      { name: "Convert Sorted Array to BST", diff: "easy" },
      { name: "Delete Node in BST", diff: "medium" },
      { name: "Inorder Successor in BST", diff: "medium" },
    ],
  },
  {
    id: "dfs-bfs",
    label: "DFS / BFS (Graphs & Trees)",
    color: "#3B8BD4",
    tag: "Graph/Tree",
    tagColor: "#185FA5",
    category: "graph",
    diff: "medium",
    complexity: { time: "O(V+E)", space: "O(V)" },
    signals: [
      "Connected components, islands counting → DFS or BFS",
      '"Shortest path in UNWEIGHTED graph" → BFS only',
      "Cycle detection in directed/undirected graph",
      "Tree: level-order traversal → BFS; path problems → DFS",
      "Topological sort (dependency ordering) → DFS or Kahn's BFS",
      '"All paths from source to target" → DFS with backtracking',
    ],
    keywords: [
      "connected components",
      "islands",
      "shortest path",
      "cycle detection",
      "level order",
      "reachable",
      "topological",
      "dependencies",
      "clone graph",
      "walls and gates",
    ],
    notThis:
      "Shortest path in WEIGHTED graph → Dijkstra (not BFS). BFS only guarantees shortest in unweighted.",
    flow: `UNWEIGHTED shortest path?
  YES → BFS (queue, level-by-level guarantees min steps)

Explore all / find components / cycles?
  YES → DFS (recursion or explicit stack)

Topological sort?
  DFS: post-order, reverse result
  BFS Kahn's: indegree array, queue nodes with indegree=0

Grid problems?
  DFS simpler for flood fill / components
  BFS for min steps / walls & gates (multi-source BFS)

Directed cycle detection:
  3 states: unvisited(0) / in-stack(1) / done(2)`,
    traps: [
      "DFS for shortest path is WRONG on unweighted graphs — always use BFS",
      "Visited set is mandatory — forgetting it causes infinite loops",
      "Directed cycle detection needs 3 states (not 2 like undirected)",
      "Multi-source BFS: enqueue ALL sources at start, not one at a time",
    ],
    vs: {
      a: {
        label: "DFS",
        desc: "Goes deep. Stack/recursion. Paths, components, topo, backtracking.",
      },
      b: {
        label: "BFS",
        desc: "Level by level. Queue. Shortest path, min steps, level order.",
      },
    },
    problems: [
      { name: "Number of Islands", diff: "medium" },
      { name: "Clone Graph", diff: "medium" },
      { name: "Course Schedule", diff: "medium" },
      { name: "Pacific Atlantic Water Flow", diff: "medium" },
      { name: "Walls and Gates", diff: "medium" },
      { name: "Word Ladder", diff: "hard" },
    ],
  },
  {
    id: "dijkstra",
    label: "Shortest Path (Dijkstra / Bellman-Ford)",
    color: "#639922",
    tag: "Graph",
    tagColor: "#3B6D11",
    category: "graph",
    diff: "hard",
    complexity: { time: "O((V+E) log V)", space: "O(V)" },
    signals: [
      "Weighted graph + shortest path from source to target",
      '"Network delay time" — min time for signal to reach all nodes',
      '"Cheapest flights within K stops"',
      '"Path with minimum effort" — min of max edge on path',
      "Negative edge weights → Bellman-Ford (not Dijkstra)",
      "All-pairs shortest path → Floyd-Warshall",
    ],
    keywords: [
      "weighted shortest path",
      "network delay",
      "cheapest flights",
      "minimum effort",
      "dijkstra",
      "bellman ford",
      "floyd warshall",
      "negative weights",
      "k stops",
    ],
    notThis:
      "Unweighted graph → BFS is simpler. Negative cycles → Bellman-Ford only (Dijkstra fails with negatives).",
    flow: `WEIGHTED shortest path from single source?
  All weights ≥ 0?
    YES → Dijkstra (min-heap, greedy)
    NO  → Bellman-Ford (relax all edges V-1 times)

Negative cycles exist?
  YES → Bellman-Ford + check Vth iteration for further relaxation

All-pairs shortest path?
  YES → Floyd-Warshall: dp[i][j] = min(dp[i][j], dp[i][k]+dp[k][j])

Dijkstra template:
  dist[src]=0, all others=∞
  Min-heap: (dist, node)
  Pop min → relax neighbors → push if improved`,
    traps: [
      "Dijkstra with negative edges FAILS — use Bellman-Ford",
      "Dijkstra is greedy: once a node is popped from heap it's finalized",
      "Modified Dijkstra: 'min of max edge' → track max edge weight instead of sum",
      "K-stops constraint → add stops dimension to state: (cost, node, stops_used)",
    ],
    vs: {
      a: {
        label: "Dijkstra",
        desc: "Non-negative weights. O((V+E)log V). Greedy.",
      },
      b: {
        label: "Bellman-Ford",
        desc: "Handles negatives. O(VE). Can detect negative cycles.",
      },
    },
    problems: [
      { name: "Network Delay Time", diff: "medium" },
      { name: "Cheapest Flights Within K Stops", diff: "medium" },
      { name: "Path With Min Effort", diff: "medium" },
      { name: "Swim in Rising Water", diff: "hard" },
      { name: "Find the City Fewest Reachable", diff: "medium" },
      { name: "Shortest Path Binary Matrix", diff: "medium" },
    ],
  },
  {
    id: "heap",
    label: "Heap / Priority Queue",
    color: "#639922",
    tag: "Various",
    tagColor: "#3B6D11",
    category: "graph",
    diff: "medium",
    complexity: { time: "O(n log k)", space: "O(k)" },
    signals: [
      '"Top K elements" — Kth largest, K most frequent',
      '"K closest points to origin"',
      "Merge K sorted lists / arrays",
      "Median of a data stream (two heaps)",
      "Task scheduler, repeatedly get next minimum",
      "Dijkstra uses min-heap internally",
    ],
    keywords: [
      "kth largest",
      "k most frequent",
      "k closest",
      "top k",
      "merge k sorted",
      "median stream",
      "task scheduler",
      "last stone",
      "find median",
    ],
    notThis: "K = n (need all sorted) → just sort. Heap optimal when K << n.",
    flow: `Kth LARGEST? → Min-heap of size K
  Push all; pop when size > K; top = Kth largest

Kth SMALLEST? → Max-heap of size K (or negate for min-heap)

Merge K sorted lists? → Min-heap(value, list_index)
  Always pull minimum, push next from same list

Median of stream? → Two heaps
  max-heap (lower half) + min-heap (upper half)
  Balance: |size diff| ≤ 1
  Median = top of larger heap or avg of both tops`,
    traps: [
      "Kth LARGEST uses MIN-heap (counterintuitive — min-heap evicts small elements)",
      "Python: heapq is min-heap only. Negate for max-heap behavior",
      "Median two-heap: maintain size invariant on every insert",
    ],
    vs: {
      a: {
        label: "Min-heap",
        desc: "Root = smallest. Kth largest, merge sorted, Dijkstra.",
      },
      b: {
        label: "Max-heap",
        desc: "Root = largest. Kth smallest, always-get-max problems.",
      },
    },
    problems: [
      { name: "Kth Largest Element", diff: "medium" },
      { name: "K Closest Points to Origin", diff: "medium" },
      { name: "Find Median From Data Stream", diff: "hard" },
      { name: "Merge K Sorted Lists", diff: "hard" },
      { name: "Task Scheduler", diff: "medium" },
      { name: "Reorganize String", diff: "medium" },
    ],
  },
  {
    id: "union-find",
    label: "Union Find (DSU)",
    color: "#9F77DD",
    tag: "Graph",
    tagColor: "#534AB7",
    category: "graph",
    diff: "medium",
    complexity: { time: "O(α(n)) ≈ O(1)", space: "O(n)" },
    signals: [
      '"Number of connected components" with dynamic edge additions',
      '"Are these nodes connected?" with online updates',
      "Cycle detection in undirected graph",
      "Minimum spanning tree (Kruskal's algorithm)",
      '"Redundant connection" — find cycle-creating edge',
      '"Accounts merge" — group by shared emails',
    ],
    keywords: [
      "connected components",
      "redundant connection",
      "number of provinces",
      "accounts merge",
      "dynamic connectivity",
      "MST kruskal",
      "friend circles",
    ],
    notThis:
      "Static graph — just do DFS/BFS once. DSU shines for DYNAMIC connectivity (edges added one by one).",
    flow: `union(a, b): merge two components
find(a): get root with PATH COMPRESSION
connected(a,b): find(a) == find(b)?

Path compression (find):
  if parent[x] != x: parent[x] = find(parent[x])

Union by rank:
  attach shorter tree under taller → keeps tree flat

Cycle detection:
  For each edge (u,v): if find(u)==find(v) → CYCLE found`,
    traps: [
      "ALWAYS use both path compression AND union by rank — without both, degrades to O(n)",
      "DSU = UNDIRECTED graphs only. Directed → use DFS-based cycle detection",
      "Kruskal's: sort edges by weight, use DSU to add edges that don't form cycles",
    ],
    vs: {
      a: {
        label: "DSU",
        desc: "Dynamic edges. O(1) per op. Online connectivity.",
      },
      b: {
        label: "BFS/DFS",
        desc: "Static graph. O(V+E). Better for path finding.",
      },
    },
    problems: [
      { name: "Number of Provinces", diff: "medium" },
      { name: "Redundant Connection", diff: "medium" },
      { name: "Accounts Merge", diff: "medium" },
      { name: "Graph Valid Tree", diff: "medium" },
      { name: "Number of Connected Components", diff: "medium" },
      { name: "Satisfiability of Equations", diff: "medium" },
    ],
  },
  {
    id: "trie",
    label: "Trie (Prefix Tree)",
    color: "#5DCAA5",
    tag: "String",
    tagColor: "#085041",
    category: "graph",
    diff: "medium",
    complexity: { time: "O(m) per op", space: "O(n*m)" },
    signals: [
      '"Search words with a given prefix"',
      "Autocomplete / word suggestion",
      '"Word Search II" — find all dictionary words in grid',
      '"Design add/search words" with wildcard (.) support',
      "Longest common prefix among string list",
    ],
    keywords: [
      "prefix",
      "autocomplete",
      "dictionary",
      "word search II",
      "starts with",
      "add word",
      "search word",
      "longest common prefix",
      "wildcard",
    ],
    notThis:
      "One word search → HashSet is simpler. Trie only when PREFIX queries matter or many words share prefixes.",
    flow: `Node: children[26 or HashMap] + isEnd flag

insert(word): traverse/create nodes per char
search(word): traverse, check isEnd at final char
startsWith(prefix): traverse, return true if path exists

Word Search II:
  Build Trie from dictionary
  DFS grid: follow Trie path, mark found when isEnd reached
  Prune: remove word from Trie after finding (deduplication)`,
    traps: [
      "Don't build Trie when a HashSet suffices — only use when prefix queries needed",
      "children[26] wastes memory if sparse → use HashMap<char,Node> instead",
      "Word Search II: remove found words from Trie to avoid duplicates",
    ],
    vs: {
      a: {
        label: "Trie",
        desc: "Prefix queries O(m). Shared prefix storage. Complex code.",
      },
      b: {
        label: "HashSet",
        desc: "Exact match O(1). No prefix support. Much simpler.",
      },
    },
    problems: [
      { name: "Implement Trie", diff: "medium" },
      { name: "Design Add and Search Words", diff: "medium" },
      { name: "Word Search II", diff: "hard" },
      { name: "Longest Common Prefix", diff: "easy" },
      { name: "Replace Words", diff: "medium" },
      { name: "Search Suggestions System", diff: "medium" },
    ],
  },
  {
    id: "fast-slow",
    label: "Fast & Slow Pointers (Floyd's)",
    color: "#E89B3C",
    tag: "Linked List",
    tagColor: "#854F0B",
    category: "array",
    diff: "medium",
    complexity: { time: "O(n)", space: "O(1)" },
    signals: [
      "Detect cycle in linked list",
      "Find start of cycle in linked list",
      '"Middle of linked list"',
      '"Happy number" — detect cycle in number sequence',
      "Determine if linked list is palindrome",
    ],
    keywords: [
      "cycle detection",
      "linked list cycle",
      "tortoise and hare",
      "middle of list",
      "happy number",
      "floyd",
      "fast pointer",
      "slow pointer",
    ],
    notThis:
      "Just need to find an element → regular traversal. Fast/Slow specifically for CYCLE detection or midpoint finding.",
    flow: `Slow moves 1 step, Fast moves 2 steps

Cycle detection:
  If they meet → cycle exists
  If fast reaches null → no cycle

Find cycle START:
  Once slow==fast (meeting point)
  Reset ONE pointer to head
  Both move 1 step at a time
  They meet at CYCLE START

Find middle:
  When fast reaches end, slow is at middle
  Even length: slow is at second middle`,
    traps: [
      "Cycle start: reset pointer to HEAD (not to meeting point)",
      "Middle: for even-length list, slow lands at SECOND middle",
      "Floyd's works for any repeated-sequence, not just linked lists (happy number!)",
    ],
    vs: {
      a: {
        label: "Fast/Slow",
        desc: "O(1) space cycle detection. Works on any sequence.",
      },
      b: {
        label: "HashSet",
        desc: "O(n) space. Simpler code but uses memory.",
      },
    },
    problems: [
      { name: "Linked List Cycle", diff: "easy" },
      { name: "Linked List Cycle II", diff: "medium" },
      { name: "Find the Duplicate Number", diff: "medium" },
      { name: "Happy Number", diff: "easy" },
      { name: "Middle of Linked List", diff: "easy" },
      { name: "Palindrome Linked List", diff: "easy" },
    ],
  },
  {
    id: "cyclic-sort",
    label: "Cyclic Sort",
    color: "#c9963a",
    tag: "Array",
    tagColor: "#854F0B",
    category: "array",
    diff: "easy",
    complexity: { time: "O(n)", space: "O(1)" },
    signals: [
      "Array contains numbers in range [1, n] or [0, n-1]",
      '"Find missing number" in [1,n] range',
      '"Find all duplicates" in [1,n] range',
      '"Find missing and duplicate" simultaneously',
      '"First missing positive" — numbers should be at index val-1',
    ],
    keywords: [
      "missing number",
      "find duplicate",
      "[1,n] range",
      "first missing positive",
      "all duplicates",
      "cyclic",
      "place at index",
    ],
    notThis:
      "Numbers NOT in [1,n] range → use HashSet/Sort. Cyclic sort only works when values map to indices.",
    flow: `Key insight: value v should be at index v-1 (or v for 0-indexed)

Algorithm:
  i = 0
  while i < n:
    j = nums[i] - 1  (correct index for nums[i])
    if nums[i] != nums[j]:
      swap(nums[i], nums[j])
    else:
      i++

After sort: scan for nums[i] != i+1 to find missing/duplicate`,
    traps: [
      "Don't increment i when you swap — re-check the new value at position i",
      "Duplicate numbers: nums[i]==nums[j] but i!=j → can't place, skip (i++)",
      "First Missing Positive: handle values out of range [1,n] before cyclic sort",
    ],
    vs: {
      a: {
        label: "Cyclic Sort",
        desc: "O(n) time + O(1) space. Only for [1,n] range.",
      },
      b: {
        label: "HashSet approach",
        desc: "O(n) time + O(n) space. Works for any values.",
      },
    },
    problems: [
      { name: "Missing Number", diff: "easy" },
      { name: "Find All Duplicates", diff: "medium" },
      { name: "Find the Duplicate Number", diff: "medium" },
      { name: "First Missing Positive", diff: "hard" },
      { name: "Find All Missing Numbers", diff: "easy" },
      { name: "Set Mismatch", diff: "easy" },
    ],
  },
  {
    id: "backtracking",
    label: "Recursion / Backtracking",
    color: "#EF9F27",
    tag: "Various",
    tagColor: "#854F0B",
    category: "dp",
    diff: "hard",
    complexity: { time: "O(2ⁿ) or O(n!)", space: "O(n) stack" },
    signals: [
      '"Generate all subsets / permutations / combinations"',
      '"Find all valid arrangements" (N-Queens, Sudoku solver)',
      '"All paths" in a graph or tree',
      "Decision tree: at each step CHOOSE include/exclude",
      '"Word search" in a grid',
      "Combination sum — pick elements with repetition allowed",
    ],
    keywords: [
      "all subsets",
      "all permutations",
      "combinations",
      "generate all",
      "valid arrangements",
      "N-queens",
      "sudoku",
      "word search",
      "paths",
      "combination sum",
    ],
    notThis:
      "Only need ONE optimal answer (not all answers) → DP is faster. Backtracking = brute force with pruning.",
    flow: `Template:
  backtrack(start, current_state):
    if valid complete solution:
      add current_state to results; return
    for each choice from start..n:
      if choice is valid (pruning):
        make choice
        backtrack(next_start, updated_state)
        undo choice  ← CRITICAL

Subsets: use start index (no visited needed)
Permutations: use visited[] array (any order)
Combination Sum: allow re-use → start stays same`,
    traps: [
      "Forgetting to UNDO the choice — this is the whole point of 'back' tracking",
      "Permutations need visited[]; subsets need start index — don't mix them",
      "Duplicates: sort first → skip nums[i]==nums[i-1] at same recursion depth",
    ],
    vs: {
      a: {
        label: "Subsets (2ⁿ)",
        desc: "Include/exclude each element. Use start index.",
      },
      b: {
        label: "Permutations (n!)",
        desc: "Use all elements in any order. Use visited[] array.",
      },
    },
    problems: [
      { name: "Subsets", diff: "medium" },
      { name: "Permutations", diff: "medium" },
      { name: "Combination Sum", diff: "medium" },
      { name: "N-Queens", diff: "hard" },
      { name: "Word Search", diff: "medium" },
      { name: "Sudoku Solver", diff: "hard" },
    ],
  },
  {
    id: "bit-manipulation",
    label: "Bit Manipulation",
    color: "#5DCAA5",
    tag: "Math",
    tagColor: "#085041",
    category: "dp",
    diff: "medium",
    complexity: { time: "O(1) or O(n)", space: "O(1)" },
    signals: [
      '"Single number" — find element appearing odd times',
      '"Power of two" — check if n is power of 2',
      "Count set bits (Hamming weight)",
      '"Missing number" — XOR approach',
      '"Reverse bits" of a 32-bit integer',
      "Bitmask DP — subset enumeration",
    ],
    keywords: [
      "XOR",
      "single number",
      "power of two",
      "count bits",
      "set bit",
      "hamming",
      "reverse bits",
      "bitmask",
      "AND OR NOT",
    ],
    notThis:
      "General arithmetic — bit tricks are micro-optimizations. Use when problem SPECIFICALLY involves bit patterns.",
    flow: `KEY TRICKS:
  n & (n-1)  → clears lowest set bit (power of 2: n&(n-1)==0)
  n & (-n)   → isolates lowest set bit
  a ^ a = 0  → XOR with itself cancels (find single number)
  a ^ 0 = a  → XOR with 0 is identity
  n >> k     → divide by 2^k
  n << k     → multiply by 2^k

Count set bits (Brian Kernighan):
  count=0; while n: n &= n-1; count++

XOR to find missing:
  XOR all indices 0..n, XOR all values → missing = result`,
    traps: [
      "Signed vs unsigned shifts: >>> vs >> in Java/JS. C++ UB on signed left shift overflow",
      "Bitmask DP: iterate subsets with (mask-1)&full_mask to enumerate proper subsets",
      "n & (n-1) == 0 is true for n=0 too — always check n > 0 for power-of-2",
    ],
    vs: {
      a: {
        label: "XOR tricks",
        desc: "Find single/missing number. O(1) space.",
      },
      b: {
        label: "Bitmask DP",
        desc: "Enumerate subsets. O(2ⁿ * n). TSP, min covers.",
      },
    },
    problems: [
      { name: "Single Number", diff: "easy" },
      { name: "Number of 1 Bits", diff: "easy" },
      { name: "Reverse Bits", diff: "easy" },
      { name: "Missing Number (XOR)", diff: "easy" },
      { name: "Sum of Two Integers (no +)", diff: "medium" },
      { name: "Counting Bits", diff: "easy" },
    ],
  },
  {
    id: "segment-tree",
    label: "Segment Tree / Fenwick Tree (BIT)",
    color: "#D85A30",
    tag: "Advanced",
    tagColor: "#993C1D",
    category: "graph",
    diff: "hard",
    complexity: { time: "O(log n) update & query", space: "O(n)" },
    signals: [
      "Range sum query WITH point updates (dynamic — can't just prefix sum)",
      '"Range minimum/maximum query" with updates',
      '"Count of smaller numbers after self"',
      "Frequency array with range queries",
      "Any problem needing range aggregation + point updates",
    ],
    keywords: [
      "range query",
      "range sum update",
      "fenwick",
      "BIT",
      "binary indexed tree",
      "segment tree",
      "update query",
      "count smaller",
      "range min max",
    ],
    notThis:
      "Static array with no updates → Prefix Sum (simpler). One query type only → might be simpler solution.",
    flow: `Fenwick Tree (BIT) — range sum + point update:
  update(i, delta): i+=1; while i<=n: tree[i]+=delta; i+=i&(-i)
  query(i): sum [1..i]; while i>0: sum+=tree[i]; i-=i&(-i)

Segment Tree — range min/max/sum + range/point update:
  build: recursively split array in half
  update: traverse to leaf, propagate up
  query: check if range fully inside/outside node range

Use Fenwick when:
  Only need prefix sums (point update, range sum query)

Use Segment Tree when:
  Range min/max queries needed
  Range updates (lazy propagation)`,
    traps: [
      "Fenwick is 1-indexed — shift all indices by +1",
      "Segment tree with lazy propagation for range updates — easy to get wrong",
      "Coordinate compression: if values are large but sparse, compress to [0,n] first",
    ],
    vs: {
      a: {
        label: "Fenwick / BIT",
        desc: "Only prefix sums. Simpler. O(log n).",
      },
      b: {
        label: "Segment Tree",
        desc: "Range min/max/sum + lazy range updates. More flexible.",
      },
    },
    problems: [
      { name: "Range Sum Query - Mutable", diff: "medium" },
      { name: "Count of Smaller After Self", diff: "hard" },
      { name: "Range Sum Query 2D", diff: "medium" },
      { name: "The Skyline Problem", diff: "hard" },
      { name: "My Calendar I", diff: "medium" },
      { name: "Falling Squares", diff: "hard" },
    ],
  },
];

export const COMPLEXITY_TABLE = [
  [
    "Two Pointers",
    "O(n)",
    "O(1)",
    "Sorted array pair/triplet problems",
    "Unsorted input → HashMap",
  ],
  [
    "Sliding Window",
    "O(n)",
    "O(k)",
    "Contiguous subarray/string with constraint",
    "Negative values + sum=k → Prefix Sum",
  ],
  [
    "Binary Search",
    "O(log n)",
    "O(1)",
    "Sorted input or monotonic answer space",
    "Unsorted, non-monotonic condition",
  ],
  [
    "Prefix Sum",
    "O(n) + O(1) query",
    "O(n)",
    "Multiple range sum queries, count subarrays",
    "One-time query → just iterate",
  ],
  [
    "HashMap/Set",
    "O(n)",
    "O(n)",
    "Frequency counting, pair finding (unsorted)",
    "Input already sorted → Two Pointers",
  ],
  [
    "Monotonic Stack",
    "O(n) amortized",
    "O(n)",
    "Next greater/smaller element",
    "Regular stack problems (parens, DFS sim)",
  ],
  [
    "Greedy",
    "O(n) or O(n log n)",
    "O(1)",
    "Local optimal = global optimal",
    "Subproblems interact → DP",
  ],
  [
    "1D DP",
    "O(n)",
    "O(1) optimized",
    "Count ways, min/max with serial decisions",
    "Single greedy choice works",
  ],
  [
    "2D DP",
    "O(n*m)",
    "O(min(n,m))",
    "Two-string/two-sequence comparisons",
    "Only one sequence → 1D DP",
  ],
  [
    "LIS / Interval DP",
    "O(n log n)",
    "O(n)",
    "Longest increasing subseq, range optimization",
    "Simple 1D subproblems",
  ],
  [
    "Backtracking",
    "O(2ⁿ) or O(n!)",
    "O(n)",
    "Generate ALL valid combinations/arrangements",
    "Only need ONE optimal → DP",
  ],
  [
    "BST Operations",
    "O(log n) avg",
    "O(h)",
    "Ordered data, in-order traversal, k-th element",
    "Generic tree → use DFS/BFS",
  ],
  [
    "DFS/BFS",
    "O(V+E)",
    "O(V)",
    "Graph traversal, components, unweighted paths",
    "Weighted shortest path → Dijkstra",
  ],
  [
    "Dijkstra",
    "O((V+E)log V)",
    "O(V)",
    "Weighted shortest path, non-negative weights",
    "Negative edges → Bellman-Ford",
  ],
  [
    "Heap / PQ",
    "O(n log k)",
    "O(k)",
    "Top-K, merge K sorted, median stream",
    "K = n → just sort",
  ],
  [
    "Union Find",
    "O(α(n)) ≈ O(1)",
    "O(n)",
    "Dynamic connectivity, cycle detection (undirected)",
    "Static graph → DFS/BFS simpler",
  ],
  [
    "Trie",
    "O(m) per op",
    "O(n*m)",
    "Prefix queries, dictionary search, word search II",
    "Single word search → HashSet",
  ],
  [
    "Fast & Slow Pointers",
    "O(n)",
    "O(1)",
    "Cycle detection, linked list middle",
    "Just traversal → regular pointer",
  ],
  [
    "Cyclic Sort",
    "O(n)",
    "O(1)",
    "Missing/duplicate in [1,n] range array",
    "Values outside [1,n] range",
  ],
  [
    "Bit Manipulation",
    "O(1) or O(n)",
    "O(1)",
    "XOR tricks, power-of-2 checks, bitmask DP",
    "General arithmetic",
  ],
  [
    "Segment Tree / BIT",
    "O(log n)",
    "O(n)",
    "Range queries WITH point updates",
    "No updates → Prefix Sum",
  ],
];

export const DECISION_SECTIONS = [
  {
    title: "Starting Point: What does the problem ask?",
    color: "#3B8BD4",
    nodes: [
      { type: "q", text: "Asks for SHORTEST PATH?" },
      {
        type: "a",
        text: "Unweighted graph/grid → BFS | Weighted (non-negative) → Dijkstra | Weighted (negatives) → Bellman-Ford",
      },
      {
        type: "q",
        text: "Asks to COUNT ways or find MIN/MAX with serial choices?",
      },
      {
        type: "a",
        text: "Count ways → likely DP | Min/max with greedy local choice → try Greedy first | Needs all prior results → DP",
      },
      { type: "q", text: "Asks to GENERATE ALL combinations/permutations?" },
      {
        type: "a",
        text: "Generate all → Backtracking. Only ONE optimal needed → DP instead",
      },
      { type: "q", text: "Asks to FIND in SORTED data?" },
      {
        type: "a",
        text: "Binary Search. If answer space monotonic → BS on Answer",
      },
    ],
  },
  {
    title: "Array Problems: Which pattern?",
    color: "#1D9E75",
    nodes: [
      { type: "q", text: "Input sorted, need pair/triplet with sum?" },
      { type: "a", text: "Two Pointers (O(n), O(1) space)" },
      { type: "q", text: "Contiguous subarray/substring with constraint?" },
      {
        type: "a",
        text: "Sliding Window. But if values can be negative + sum=k → Prefix Sum + HashMap",
      },
      {
        type: "q",
        text: "Multiple range sum queries OR count subarrays with sum=k?",
      },
      {
        type: "a",
        text: "Prefix Sum. Count subarrays = Prefix + HashMap trick",
      },
      { type: "q", text: "Next greater/smaller element?" },
      { type: "a", text: "Monotonic Stack" },
      { type: "q", text: "Top-K elements / Kth largest?" },
      {
        type: "a",
        text: "Heap of size K → O(n log k). Quickselect → O(n) average",
      },
      { type: "q", text: "Numbers in [1,n] range, find missing/duplicate?" },
      { type: "a", text: "Cyclic Sort → O(n) time + O(1) space" },
    ],
  },
  {
    title: "Graph Problems: Which traversal?",
    color: "#D4537E",
    nodes: [
      { type: "q", text: "Need to explore all nodes / find components?" },
      {
        type: "a",
        text: "DFS or BFS (both work, DFS simpler to code recursively)",
      },
      { type: "q", text: "Shortest path in grid / unweighted graph?" },
      {
        type: "a",
        text: "BFS (guarantees min steps). Multi-source BFS if multiple starting points",
      },
      {
        type: "q",
        text: "Dependency ordering / detect cycle in directed graph?",
      },
      {
        type: "a",
        text: "Topological Sort: DFS post-order reverse, OR Kahn's BFS (indegree)",
      },
      { type: "q", text: "Dynamic connectivity — edges added one by one?" },
      { type: "a", text: "Union-Find (DSU) — O(α(n)) per operation" },
      { type: "q", text: "Weighted shortest path?" },
      {
        type: "a",
        text: "All weights ≥ 0 → Dijkstra. Negative weights → Bellman-Ford. All pairs → Floyd-Warshall",
      },
    ],
  },
  {
    title: "String Problems: Which approach?",
    color: "#9F77DD",
    nodes: [
      { type: "q", text: "Longest/shortest substring with constraint?" },
      {
        type: "a",
        text: "Sliding Window (variable). Fixed size K → Fixed sliding window",
      },
      { type: "q", text: "Frequency counting / anagram check?" },
      { type: "a", text: "HashMap or int[26] array (faster for lowercase)" },
      {
        type: "q",
        text: "Prefix queries / autocomplete / word search with many words?",
      },
      { type: "a", text: "Trie. Single word existence → HashSet" },
      { type: "q", text: "Two strings: LCS, edit distance, transformation?" },
      { type: "a", text: "2D DP. Rows = one string, columns = other string" },
    ],
  },
  {
    title: "DP Sub-type Selection",
    color: "#c9963a",
    nodes: [
      { type: "q", text: "dp[i] depends only on dp[i-1] or dp[i-2]?" },
      { type: "a", text: "1D DP. Space optimize to O(1) with 2 variables" },
      { type: "q", text: "Two sequences / two strings?" },
      {
        type: "a",
        text: "2D DP: dp[i][j] = f(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])",
      },
      { type: "q", text: "Longest increasing subsequence?" },
      { type: "a", text: "O(n²) simple DP or O(n log n) patience sort" },
      { type: "q", text: "Optimize over a range/interval [i..j]?" },
      {
        type: "a",
        text: "Interval DP: dp[i][j] = best split point k in [i..j-1]",
      },
      { type: "q", text: "DP on tree nodes?" },
      {
        type: "a",
        text: "DFS post-order: compute children first, then combine at parent",
      },
      {
        type: "warn",
        text: "⚠ GREEDY CHECK FIRST: If local optimal never hurts global → Greedy is O(n) vs DP O(n²). Always try to prove/disprove greedy before committing to DP.",
      },
    ],
  },
];


PATTERNS.push({
  id: "kadanes",
  label: "Kadane's Algorithm",
  color: "#E24B4A",
  tag: "Array",
  tagColor: "#A32D2D",
  category: "array",
  diff: "easy",
  complexity: { time: "O(n)", space: "O(1)" },
  signals: [
    '"Maximum subarray sum" — this IS Kadane\'s',
    '"Maximum sum contiguous subarray"',
    '"Maximum product subarray" — modified Kadane\'s',
    '"Circular subarray max sum" — Kadane\'s + invert trick',
    "Any problem asking for optimal contiguous range with additive property",
  ],
  keywords: [
    "max subarray",
    "maximum sum",
    "contiguous",
    "kadane",
    "max product subarray",
    "circular subarray",
  ],
  notThis:
    "If you need the actual subarray (not just sum) → track indices too. If values are all positive → max subarray = entire array.",
  flow: `curSum = nums[0], maxSum = nums[0]

For each num (starting index 1):
  curSum = max(num, curSum + num)   ← restart or extend
  maxSum = max(maxSum, curSum)      ← update global max

KEY INSIGHT: if curSum < 0, starting fresh from num is better
This is GREEDY (not DP) — no prior results needed, just prior curSum

Max product variant:
  Track BOTH curMin and curMax
  Negative number flips min↔max
  curMax = max(num, num*prevMax, num*prevMin)`,
  traps: [
    "Initialize with nums[0], NOT 0. All-negative arrays would incorrectly return 0",
    "Max product: must track curMin too because negative × negative = positive",
    "Circular subarray: maxCircular = totalSum - minSubarray. Handle all-negative edge case",
  ],
  vs: {
    a: {
      label: "Kadane's",
      desc: "O(n) time, O(1) space. Greedy — restart when curSum goes negative.",
    },
    b: {
      label: "Prefix Sum",
      desc: "Also O(n) but O(n) space. Use when counting subarrays or handling negatives with sum=k.",
    },
  },
  problems: [
    { name: "Maximum Subarray", diff: "medium" },
    { name: "Maximum Product Subarray", diff: "medium" },
    { name: "Circular Subarray Max Sum", diff: "medium" },
    { name: "Max Sum of 3 Non-Overlapping", diff: "hard" },
    { name: "Longest Turbulent Subarray", diff: "medium" },
    { name: "Max Ascending Subarray Sum", diff: "easy" },
  ],
  failFast: [
    {
      rule: "Non-contiguous elements needed?",
      verdict: "NOT Kadane's → DP (house robber) or sort-based",
    },
    {
      rule: "Need COUNT of subarrays, not max sum?",
      verdict: "NOT Kadane's → Prefix Sum + HashMap",
    },
    {
      rule: "2D matrix version?",
      verdict: "Kadane's on each row compressed → O(n³) or O(n²m)",
    },
  ],
});


const FAIL_FAST_MAP = {
  "two-pointers": [
    {
      rule: "Array is unsorted AND you need pairs?",
      verdict: "NOT Two Pointers → HashMap O(n) + O(n) space",
    },
    {
      rule: "Need contiguous subarray/substring?",
      verdict: "NOT Two Pointers → Sliding Window",
    },
    {
      rule: "Array has no order/structure to exploit?",
      verdict: "NOT Two Pointers → HashMap or Sort first",
    },
  ],
  "sliding-window": [
    {
      rule: "Values can be negative AND you need sum = k?",
      verdict: "NOT Sliding Window → Prefix Sum + HashMap",
    },
    {
      rule: "Current element depends on non-adjacent past results?",
      verdict: "NOT Sliding Window → DP",
    },
    {
      rule: "Need non-contiguous elements?",
      verdict: "NOT Sliding Window → DP or Two Pointers",
    },
  ],
  "binary-search": [
    {
      rule: "No monotonic condition or sorted structure?",
      verdict: "NOT Binary Search — can't guarantee O(log n)",
    },
    {
      rule: "Need ALL occurrences, not just one?",
      verdict: "NOT Binary Search → Scan or combine with BS for bounds",
    },
    {
      rule: "Input changes dynamically?",
      verdict: "NOT classic BS → Balanced BST or Segment Tree",
    },
  ],
  "prefix-sum": [
    {
      rule: "Only one range query, no updates?",
      verdict: "NOT Prefix Sum needed → just iterate O(n)",
    },
    {
      rule: "Need range updates too (not just queries)?",
      verdict: "NOT simple Prefix Sum → Segment Tree or BIT",
    },
    {
      rule: "Values change dynamically?",
      verdict: "NOT static Prefix Sum → BIT/Fenwick for dynamic prefix",
    },
  ],
  hashmap: [
    {
      rule: "Input is sorted and you need pairs?",
      verdict: "NOT HashMap → Two Pointers saves O(n) space",
    },
    {
      rule: "Lowercase chars only, frequency count?",
      verdict: "NOT HashMap → int[26] array is faster",
    },
    {
      rule: "Need ordered iteration over keys?",
      verdict: "NOT HashMap → TreeMap / sorted Map",
    },
  ],
  monotonic: [
    {
      rule: "Need max of ENTIRE array (not per element)?",
      verdict: "NOT Monotonic Stack → simple max scan",
    },
    {
      rule: "Balanced parentheses / DFS simulation?",
      verdict: "NOT Monotonic Stack → regular stack",
    },
    {
      rule: "Need random access to elements?",
      verdict: "NOT Monotonic Stack → Segment Tree for range queries",
    },
  ],
  greedy: [
    {
      rule: "Future subproblem choices affect current optimal?",
      verdict: "NOT Greedy → DP (greedy gives wrong answer)",
    },
    {
      rule: "Need ALL solutions, not just optimal?",
      verdict: "NOT Greedy → Backtracking",
    },
    {
      rule: "Can't define a clear locally optimal choice?",
      verdict: "NOT Greedy → DP or Backtracking",
    },
  ],
  "dp-1d": [
    {
      rule: "Local greedy choice is always globally optimal?",
      verdict: "NOT DP needed → Greedy is O(n) and simpler",
    },
    {
      rule: "Need ALL solutions not just count/optimal?",
      verdict: "NOT DP → Backtracking",
    },
    {
      rule: "State needs two dimensions (two sequences)?",
      verdict: "NOT 1D DP → 2D DP",
    },
  ],
  "dp-2d": [
    {
      rule: "Only one string/sequence (not two)?",
      verdict: "NOT 2D DP → 1D DP is sufficient",
    },
    {
      rule: "Greedy sort-based solution exists?",
      verdict: "NOT DP → verify greedy first (e.g. LIS with patience sort)",
    },
  ],
  "dp-lis": [
    {
      rule: "Subsequence must be contiguous?",
      verdict: "NOT LIS → Sliding Window or Kadane's variant",
    },
    {
      rule: "Only need length, not actual subsequence?",
      verdict: "Use O(n log n) patience sort (simpler)",
    },
  ],
  bst: [
    {
      rule: "Tree has no BST ordering property?",
      verdict: "NOT BST approach → use generic DFS/BFS O(n)",
    },
    {
      rule: "Need to handle worst case O(log n) guaranteed?",
      verdict: "NOT plain BST → AVL or Red-Black Tree (balanced)",
    },
  ],
  "dfs-bfs": [
    {
      rule: "Graph is weighted and you need shortest path?",
      verdict: "NOT BFS → Dijkstra for non-negative, Bellman-Ford for negative",
    },
    {
      rule: "Using DFS for shortest path?",
      verdict: "WRONG — DFS does NOT guarantee shortest path, use BFS",
    },
    {
      rule: "Forgot visited set?",
      verdict: "WILL INFINITE LOOP on cyclic graphs — always track visited",
    },
  ],
  dijkstra: [
    {
      rule: "Graph has negative edge weights?",
      verdict: "NOT Dijkstra → Bellman-Ford (Dijkstra gives wrong answer)",
    },
    {
      rule: "Graph is unweighted?",
      verdict: "NOT Dijkstra → BFS is simpler and O(V+E)",
    },
    {
      rule: "Need all-pairs shortest paths?",
      verdict: "NOT single-source Dijkstra → Floyd-Warshall O(V³)",
    },
  ],
  heap: [
    {
      rule: "K equals N (need all elements sorted)?",
      verdict: "NOT Heap → just sort O(n log n), same complexity simpler",
    },
    {
      rule: "Need range queries on the K elements?",
      verdict: "NOT just Heap → Segment Tree or sorted structure",
    },
  ],
  "union-find": [
    {
      rule: "Graph is directed (need directed cycle detection)?",
      verdict: "NOT DSU → DFS with 3-state coloring",
    },
    {
      rule: "Need actual path between nodes, not just connectivity?",
      verdict: "NOT DSU → BFS/DFS for path reconstruction",
    },
    {
      rule: "Static graph, just need components once?",
      verdict: "NOT DSU needed → simple DFS/BFS is cleaner",
    },
  ],
  trie: [
    {
      rule: "Only exact word search, no prefix queries?",
      verdict: "NOT Trie → HashSet is O(1) and far simpler",
    },
    {
      rule: "Very few words with no shared prefixes?",
      verdict: "NOT Trie → HashMap overhead not worth it",
    },
  ],
  "fast-slow": [
    {
      rule: "No cycle possible in the structure?",
      verdict: "NOT Fast/Slow → regular traversal or two-pointer",
    },
    {
      rule: "Need exact position of all elements?",
      verdict: "NOT Fast/Slow → indexed traversal",
    },
  ],
  "cyclic-sort": [
    {
      rule: "Values are NOT in [1,n] or [0,n-1] range?",
      verdict: "NOT Cyclic Sort → HashSet or sorting approach",
    },
    {
      rule: "Values can repeat more than twice?",
      verdict: "NOT basic Cyclic Sort → need HashSet for multiple duplicates",
    },
  ],
  backtracking: [
    {
      rule: "Only need ONE optimal solution (not all)?",
      verdict: "NOT Backtracking → DP is O(2^n) faster with memoization",
    },
    {
      rule: "No undo needed (choices are permanent)?",
      verdict: "NOT Backtracking → greedy or DP",
    },
    {
      rule: "Problem has optimal substructure?",
      verdict: "PREFER DP — backtracking recomputes overlapping subproblems",
    },
  ],
  "bit-manipulation": [
    {
      rule: "Problem is general arithmetic, not bit-pattern specific?",
      verdict: "NOT bit tricks → just use normal operations",
    },
    {
      rule: "Need to handle signed/unsigned carefully?",
      verdict: "Watch for language-specific bit behavior (JS: 32-bit signed)",
    },
  ],
  "segment-tree": [
    {
      rule: "No updates, only static queries?",
      verdict:
        "NOT Segment Tree → Prefix Sum is simpler O(n) build + O(1) query",
    },
    {
      rule: "Only point updates + range sum (no min/max)?",
      verdict: "NOT full Segment Tree → BIT/Fenwick is simpler",
    },
  ],
  intervals: [
    {
      rule: "Intervals are already sorted?",
      verdict: "Skip the sort step — saves O(n log n)",
    },
    {
      rule: "Need to find gaps (free time)?",
      verdict: "NOT just merge → merge first, then find gaps between intervals",
    },
  ],
};

for (const p of PATTERNS) {
  if (!p.failFast && FAIL_FAST_MAP[p.id]) {
    p.failFast = FAIL_FAST_MAP[p.id];
  }
}
