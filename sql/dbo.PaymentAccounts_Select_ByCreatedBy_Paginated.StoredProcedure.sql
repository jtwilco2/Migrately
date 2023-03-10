CREATE proc [dbo].[PaymentAccounts_Select_ByCreatedBy_Paginated]
		@CreatedBy int
		,@PageIndex int
		,@PageSize int

		/* -- Test Code --
			declare @CreatedBy int = 1
					,@PageIndex int = 0
					,@PageSize int = 1

			execute [dbo].[PaymentAccounts_Select_ByCreatedBy_Paginated] @CreatedBy
																		,@PageIndex
																		,@PageSize

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
		WHERE CreatedBy = @CreatedBy
		ORDER BY Id

		OFFSET @offset rows
		FETCH NEXT @PageSize rows only


end

GO
