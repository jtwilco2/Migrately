CREATE proc [dbo].[PaymentAccounts_SelectAll_Paginated]
		@PageIndex int
		,@PageSize int

		/* -- Test Code --
		declare @PageIndex int = 0
				,@PageSize int = 5

		execute dbo.PaymentAccounts_SelectAll_Paginated @PageIndex, @PageSize
		*/

as
begin
		DECLARE @offset int = @PageIndex * @PageSize

		SELECT Id
			  ,AccountId
			  ,PaymentTypeId
			  ,DateCreated
			  ,DateModified
			  ,CreatedBy
			  ,ModifiedBy
			  ,TotalCount = Count(1) OVER()
		FROM dbo.PaymentAccounts
		ORDER BY Id

		OFFSET @offset ROWS
		FETCH NEXT @PageSize rows only



end

GO
