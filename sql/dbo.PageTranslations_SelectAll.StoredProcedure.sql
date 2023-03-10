CREATE proc [dbo].[PageTranslations_SelectAll]
		@PageIndex int
		,@PageSize Int

as

/*

	Declare @PageIndex Int = 0
			,@PageSize Int = 10

	Execute dbo.PageTranslations_SelectAll	@PageIndex
											,@PageSize

*/
BEGIN

Declare @offset int = @PageIndex * @PageSize

SELECT [Id]
      ,[LanguageId]
      ,[Link]
      ,[Name]
      ,[DateCreated]
      ,[DateModified]
      ,[CreatedBy]
      ,[IsActive]
	  ,TotalCount = COUNT(1) OVER()
  FROM [dbo].[PageTranslations]

  ORDER by Id

  OFFSET @offset Rows
	Fetch Next @PageSize Rows Only

END
GO
