export const QuickStats = () => {
      return (
            <div className="flex gap-2 xl:gap-4 text-xs">
                  <div>
                        <span className="text-portgreen font-thin mr-1">
                              CASH:
                        </span>
                        <span className="text-foreground">$0</span>
                  </div>
                  <div>
                        <span className="text-portgreen font-thin mr-1">
                              KARMA:
                        </span>
                        <span className="text-foreground">0</span>
                  </div>
                  <div>
                        <span className="text-portgreen font-thin mr-1">
                              LEVEL:
                        </span>
                        <span className="text-foreground">1</span>
                  </div>
            </div>
      );
};

export default QuickStats;
